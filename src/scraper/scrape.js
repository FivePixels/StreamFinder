const puppeteer = require('puppeteer');
const MongoClient = require('mongodb').MongoClient;

// Specifically for scraping
// Stores in database once finished scraping
// query is the movie or show name
// type is the media type ("tv" for tv show or "movie")

exports.performSearch = async function (id, query, type) {
  try {
    const uri = "mongodb+srv://user0:8HL0NBINt6B8mIYF@cluster0.kfyrm.mongodb.net/StreamFinder?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    const database = client.db("db");
    const tv = database.collection("tv");
    const movie = database.collection('movie')
    const browser = await puppeteer.launch({
      ignoreDefaultArgs: ["--disable-extensions"],
      args: [`--no-sandbox`, `--no-zygote`, `--single-process`, `--args`, `--disable-dev-shm-usage`],
      headless: true
    })
    const pages = await browser.pages();
    const page = pages[0];
    await page.goto('https://google.com');
    const searchBox = await page.$x("/html/body/div[1]/div[3]/form/div[1]/div[1]/div[1]/div/div[2]/input");
    await searchBox[0].type(`${query} ${type} streaming`);
    await page.keyboard.press('Enter');
    await page.waitForNavigation();
    const resultsContainer = await page.$$('.r0VsPb')
    var streamingPlatforms;
    var streamingPrices;
    for (let i = 0; i < resultsContainer.length; i++) {
      streamingPlatforms = await resultsContainer[i].$$eval('.i3LlFf', nodes => nodes.map(n => n.innerText));
      streamingPrices = await resultsContainer[i].$$eval('.V8xno', nodes => nodes.map(n => n.innerText))
    }
    if (type == "movie") {
      await movie.insertOne({
        title: query,
        id: id,
        service: streamingPlatforms,
        price: streamingPrices
      })
    } else if (type == "tv") {
      await tv.insertOne({
        title: query,
        id: id,
        service: streamingPlatforms,
        price: streamingPrices
      })
    }
    await client.close()
    await browser.close();
  } catch (error) {
    console.log(error)
  }
}

const puppeteer = require('puppeteer');

async function performSearch(query) {
  const browser = await puppeteer.launch({
    headless: false
  });
  const pages = await browser.pages();
  const page = pages[0];
  await page.goto('https://google.com');
  const searchBox = await page.$x("/html/body/div[1]/div[3]/form/div[1]/div[1]/div[1]/div/div[2]/input");
  await searchBox[0].type(`${query} streaming`);
  await page.keyboard.press('Enter');
  await page.waitForNavigation();
  const resultsContainer = await page.$$('.r0VsPb')
  var streamingPlatforms;
  var streamingPrices;
  for (let i = 0; i < resultsContainer.length; i++) {
    streamingPlatforms = await resultsContainer[i].$$eval('.i3LlFf', nodes => nodes.map(n => n.innerText)); 
    streamingPrices = await resultsContainer[i].$$eval('.V8xno', nodes => nodes.map(n => n.innerText))
  }
  console.log(streamingPlatforms);
  console.log(streamingPrices);
}

// performSearch("sorry to bother you")
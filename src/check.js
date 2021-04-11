const MongoClient = require('mongodb').MongoClient;


// This is for passing the parameters of the search to check and see if it already exists in the database
// if it does exist, we're gonna call another function in another file.

const scraper = require('./scraper/scrape')

exports.performCheck = async function performCheck(id, query, type) {
    const uri = "mongodb+srv://user0:8HL0NBINt6B8mIYF@cluster0.kfyrm.mongodb.net/StreamFinder?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    var result;
    await client.connect();
    const database = client.db("db");
    const tv = database.collection("tv");
    const movie = database.collection('movie')
    const search = { id: `${id}` };
    // check to see if the title is already in the database
    switch (type) {
        case 'tv':
            result = await tv.findOne(search);
            break;
        case 'movie':
            result = await movie.findOne(search);
            break;
    }
    if (result == null) {
        console.log('no db entry found')
        await scraper.performSearch(id, query, type)
    }
    // (if it needed to be scraped, it now is, and its stored. next, we perform the database search for the newly saved entry)
    console.log('start db search')
    var array = await performDatabaseSearch(id, type); // returns values
    await client.close();
    return array;
}

async function performDatabaseSearch(id, type) {
    // do database search
    const uri = "mongodb+srv://user0:8HL0NBINt6B8mIYF@cluster0.kfyrm.mongodb.net/StreamFinder?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    var result;
    await client.connect();
    const database = client.db("db");
    const tv = database.collection("tv");
    const movie = database.collection('movie')
    const search = { id: `${id}` };
    // check to see if the title is already in the database
    switch (type) {
        case 'tv':
            result = await tv.findOne(search)
            break;
        case 'movie':
            result = await movie.findOne(search)
            break;
    }
    client.close()
    console.log('db search finished')
    return [result.service, result.price]
}
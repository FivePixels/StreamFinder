const MongoClient = require('mongodb').MongoClient;

// This is for passing the parameters of the search to check and see if it already exists in the database
// if it does exist, we're gonna call another function in another file.

const scraper = require('./scraper/scrape')

exports.performCheck = async function performCheck(query, type) {
    // if (!exist in database) {
        await scraper.performSearch(query, type);
    // }
    // (if it needed to be scraped, it now is, and its stored. next, we perform the database search for the newly saved entry)
    performDatabaseSearch(query, type);
}

async function performDatabaseSearch(query, type) {
    // do database search
}
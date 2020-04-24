const scrape = require('../utils/scrape');
const db = require('../models/db');

async function scrapeSave() {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await scrape.scrapeStats();
            await db.saveData(data);
            resolve(true);
        } catch (error) {
            console.log(error);
            reject(error);        
        }        
    });
}

module.exports.scrapeSave = scrapeSave;
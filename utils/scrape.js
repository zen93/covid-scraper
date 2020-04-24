const puppeteer = require('puppeteer');
const $ = require('cheerio');

const coronaURL = 'https://www.worldometers.info/coronavirus/';

function scrapeStats() {
  return new Promise(async (resolve, reject) => {
    let browser = await puppeteer.launch();
    let data = [];

    browser.newPage()
      .then(page => {
        return page.goto(coronaURL)
                .then(() => {
                  return page.content();
                });
      })
      .then(html => {
        browser.close();
        
        $('#main_table_countries_today', html).children().children('.even:not([data-continent]), .odd:not([data-continent])').each((i, elm) => {
          let d = {};
          $('td', elm).each((i, elm) => {
            switch (i) {
              case 0:
                d.country = $(elm).text();
                break;
              case 1:
                d.cases = $(elm).text();
                break;
              case 3:
                d.deaths = $(elm).text();
                if(!d.deaths.trim())  d.deaths = '0';
                break;
              default:
                break;
            }
          });
          data.push(d);
        });
        resolve(data);
      })
      .catch(err => {
        reject(err);
      });
  });
}

module.exports.scrapeStats = scrapeStats;
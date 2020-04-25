const axios = require('axios');

async function getCountries() {
    return new Promise(async (resolve, reject) => {
        try {
            const url = "https://api.covid19api.com/countries";
            let response = await axios.get(url);
            resolve(response.data);
        } catch(err) {
            reject(err);
        }
    });
}

async function getCountryTotal(country) {
    return new Promise(async (resolve, reject) => {
        try {
            const url = encodeURI(`https://api.covid19api.com/total/country/${country}`);
            let response = await axios.get(url);
            resolve(response.data);
        } catch(err) {
            console.log("Country:" + country);
            console.log(err);
            reject(err);
        }
    });
}

module.exports.getCountries = getCountries;
module.exports.getCountryTotal = getCountryTotal;

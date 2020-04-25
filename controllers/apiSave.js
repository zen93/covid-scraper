const api = require('../utils/api');
const db = require('../models/db');

async function apiSave() {
    return new Promise(async (resolve, reject) => {
        try {
            let countries = await api.getCountries();
            for(let country of countries) {
                let data = await api.getCountryTotal(country.Slug);
                data.forEach(el => { 
                    el.slug = country.Slug;
                    delete el.CountryCode;
                    delete el.Province;
                    delete el.City;
                    delete el.CityCode;
                    delete el.Lat;
                    delete el.Lon;
                });
                await db.saveTotalData(data, country.Slug);
            }
            resolve();
        } catch (error) {
            reject(error);   
        }
    });    
}

module.exports.apiSave = apiSave;
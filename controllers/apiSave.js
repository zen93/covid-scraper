const api = require('../utils/api');
const db = require('../models/db');
const Firestore = require('@google-cloud/firestore');

async function apiSaveNew() {
    return new Promise(async (resolve, reject) => {
        try {
            let countries = await api.getCountries();
            for(let country of countries) {
                let data = await api.getCountryTotal(country.Slug);

                data.forEach(el => { 
                    el.slug = country.Slug;
                    el.id = el.Date;
                    el.Date = Firestore.Firestore.Timestamp.fromDate(new Date(el.Date));
                    delete el.CountryCode;
                    delete el.Province;
                    delete el.City;
                    delete el.CityCode;
                    delete el.Lat;
                    delete el.Lon;
                });
                await db.saveTest(data, country.Slug);
                console.log(country.Slug);
            }
            resolve();
        } catch (error) {
            console.log(error.message);
            reject(error);   
        }
    });    
}

async function apiSave() {
    return new Promise(async (resolve, reject) => {
        try {
            let countries = await api.getCountries();
            for(let country of countries) {
                let data = await api.getCountryTotal(country.Slug);
                data.forEach(el => { 
                    el.slug = country.Slug;
                    el.Date = Firestore.Firestore.Timestamp.fromDate(new Date(el.Date));
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
module.exports.apiSaveNew = apiSaveNew;
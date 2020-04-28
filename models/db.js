const Firestore = require('@google-cloud/firestore');

const db = new Firestore({
  projectId: 'wordpress-cloud-run',
  keyFilename: './keys/wordpress-cloud-run-owner-key.json',
});

function cleanNum(num) {
    return parseInt(num.trim().replace(',', ''));
}

function fetchData() {
    return new Promise((resolve, reject) => {
        let data = [];
        db.collection('countries').get()
            .then((snapshot) => {
                snapshot.forEach(doc => {
                    data.push({country: doc.id, cases: doc.data().cases, deaths: doc.data().deaths });
                });
                resolve(data);
            })
            .catch( err => {
                console.log('Error getting documents: ' + err);
                reject(err);
            });            
    });
}

async function saveTest(data, slug) {
    return new Promise(async (resolve, reject) => {
        try {
            let latestDoc = {}, latestDate = null;
            let countryRef = db.collection('TestCollection').doc('countries').collection(slug);
            let snapshot = await countryRef.orderBy('Date', 'desc').limit(1).get();
            snapshot.forEach((doc) => {
                if(doc.data()) {
                    latestDoc = doc.data();
                    latestDate = new Date(latestDoc.Date.toDate());
                }
            });            
            
            let begin = data.sort((a, b) => new Date(a.id) - new Date(b.id)).findIndex(el => {
                if(!latestDate) return true;
                return new Date(el.id) > latestDate;
            });
            
            if(begin == -1) {
                return resolve();
            }
            data = data.slice(begin, data.length);
            
            let count = 0;
            const batchSize = 500;
            while(count < data.length) {
                let batch = db.batch();
                let partData = data.slice(count, (data.length - count+batchSize) > 0 ? (count+batchSize) : data.length );
                for(let d of partData) {
                    let docId = d.id;
                    let docRef = db.collection('TestCollection').doc('countries').collection(slug).doc(docId);

                    delete d.id;
                    d.slug = slug;
                    batch.set(docRef, d);
                }
                count += batchSize;
                await batch.commit();
            }
            resolve(true);
        } catch (error) {
            console.log(error.message);
            reject(error);
        }
    });
}

async function saveTotalData(data, slug) {
    return new Promise(async (resolve, reject) => {
        try {
            let docRef = db.collection('countriesTotal').doc(slug);
            let setStats = await docRef.set({ slug: slug, data: data });
            resolve(true);
        } catch (error) {
            console.log(error.message);
            reject(error);
        }
    });
}

async function saveData(data) {
    return new Promise(async (resolve, reject) => {
        try {
            for(let country of data) {
                let docRef = db.collection('countries').doc(country.country.trim().toLowerCase());
                let setStats = await docRef.set({
                    cases: cleanNum(country.cases),
                    deaths: cleanNum(country.deaths),
                });
            }
            resolve(true);
        } catch (error) {
            reject(error);
        }
    });
}

module.exports.fetchData = fetchData;
module.exports.saveData = saveData;
module.exports.saveTotalData = saveTotalData;
module.exports.saveTest = saveTest;
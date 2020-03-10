const {MongoClient} = require('mongodb');
const url = 'mongodb://localhost:27017';
const dbName = 'circulation';

function circulationRepo() {

    function loadData(data) {
        return new Promise(async (resolve,reject) =>{
            const client = new MongoClient(url);
            try {
                await client.connect();
                const db = client.db(dbName);
                let results = await db.collection('newspapers').insertMany(data);
                resolve(results);
                client.close();
            }
            catch (error) {
                reject(error)
            }
        })
    }
    
    function get(query) {
        return new Promise(async (resolve,reject)=>{
            try{
                const client = new MongoClient(url);
                await client.connect();
                const db = client.db(dbName);
                const item = db.collection('newspapers').find(query);
                resolve(await item.toArray());
                client.close();
            }
            catch (e) {
                reject(e)
            }
        })
    }
    
    return {
        loadData,
        get
    }
}
module.exports = circulationRepo();


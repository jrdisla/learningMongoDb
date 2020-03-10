const MongoClient = require('mongodb').MongoClient;
const circulationRepo = require('./respos/circulationRepo');
const data = require('./circulation');
const Assert = require('assert');

const url = 'mongodb://localhost:27017';
const dbName = 'circulation';

async function main() {
    const client = new MongoClient(url);
    await client.connect();

    try {
        const result = await circulationRepo.loadData(data);
        Assert.equal(data.length,result.insertedCount);

        const getData = await circulationRepo.get();
        Assert.equal(data.length,getData.length);

        const filterData = await circulationRepo.get({Newspaper:getData[4].Newspaper});
        Assert.equal(filterData[0],getData[4]);
    }
    catch (e) {
        console.log(e);
    }
    finally {
        // const admin = client.db(dbName).admin();
        await client.db(dbName).dropDatabase();
        // console.log(await admin.listDatabases());
        client.close();
    }


}
main();


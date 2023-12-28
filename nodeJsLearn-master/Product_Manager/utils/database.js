const { MongoClient } = require('mongodb')

let db;

const uri = 'mongodb://127.0.0.1:27017/'
const MongoConnect = (cb) => {
    MongoClient.connect(uri).then((client) => {
        console.log("Database Connected Successully");
        // console.log(client);
        db = client.db('Shop');

        cb()

    })

}
const getDB = () => {
    if (db) {
        return db;
    } else {
        throw "No DB Found "
    }
}

exports.getDB = getDB;

exports.MongoConnect = MongoConnect
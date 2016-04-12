/**
 * Created by bert on 4/12/16.
 */

var MongoDB = require('mongodb');
var MongoClient = MongoDB.MongoClient;

connection = "mongodb://localhost:27017/database";

MongoClient.connect(connection, function (error, db) {
    if (error) {
        return console.log(error);
    }

    console.log("We have a connection");

    var collection = db.collection('test_collection');

    var doc = {
        key: 'value1'
    };

    collection.save(doc, {w: 1}, function () {
        console.log('Document saved');

    });

    // Simple query for all collections in the MongoDB.
    collection.find().toArray(function (error, result) {
        console.log(result.length + " documents in our database");
    });
});

// More examples in the book, but first a basic understanding of MongoDB should be acquired.
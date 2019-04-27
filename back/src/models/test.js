const MongoClient = require('mongodb').MongoClient;

const uri = "mongodb+srv://adrien:tillot03@cluster0-ph5jx.mongodb.net/test?retryWrites=true";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
    const collection = client.db("test").collection("devices");
    // perform actions on the collection object
    collection.save();
    client.close();
});



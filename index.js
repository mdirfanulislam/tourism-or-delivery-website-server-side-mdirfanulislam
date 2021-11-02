const express = require('express');
const { MongoClient } = require('mongodb');
require('dotenv').config();
const cors = require('cors');

const app = express()
const port = process.env.PORT || 5000

// middle ware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.6azhy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

console.log(uri)

async function run() {
    try{
        await client.connect()
        const database = client.db('tourism');
        const touristPlaces = database.collection('places');

        app.get('/places', async (req, res) => {
            const cursor = touristPlaces.find({});
            const places = await cursor.toArray();
            res.send(places);
        })
    }
    finally{
        // await client.close();
    }
}

run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('ctg server running')
})

app.listen(port, () => {
  console.log(`ctg tourism server lisining, ${port}`)
})


// Error: queryTxt ETIMEOUT cluster0.6azhy.mongodb.net

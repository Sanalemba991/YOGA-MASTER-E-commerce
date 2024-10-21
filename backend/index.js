const express = require('express')
const app = express()
const port = process.env.PORT || 4000;

// laitonjamsanalembameitei99
//jhSzk7Q881b7RMAO
const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = "mongodb+srv://laitonjamsanalembameitei99:jhSzk7Q881b7RMAO@yoga-master.mc6jh.mongodb.net/?retryWrites=true&w=majority&appName=yoga-master";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    await client.close();
  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Rom Start')
})

app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})
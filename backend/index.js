const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 4000;
const cors = require('cors');

// Middleware
app.use(cors());
app.use(express.json());

const { MongoClient, ServerApiVersion } = require('mongodb');

// Use environment variables in the connection string
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@yoga-master.mc6jh.mongodb.net/?retryWrites=true&w=majority&appName=yoga-master`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();
    const database = client.db("yoga-master"); // Replace with your database name
    const userCollection = database.collection("users");
    const classesCollection = database.collection("classes"); // Replace with your collection name
    const cartCollection = database.collection("cart");
    const paymentCollection = database.collection("payments");
    const enrolledCollection = database.collection("enrolled");
    const appliedCollection = database.collection("applied");

    // Classes routes here
    app.post('/new-class', async (req, res) => {
      const newClass = req.body;
      // Uncomment if you need to convert availableSeats to an integer
      // newClass.availableSeats = parseInt(newClass.availableSeats);

      const result = await classesCollection.insertOne(newClass);
      res.send(result);
    });

    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  } finally {
    // You might want to avoid closing the client here
    // await client.close(); // Keep the connection open for future requests
  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Rom Start');
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

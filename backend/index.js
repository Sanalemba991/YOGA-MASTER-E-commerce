const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 4000;
const cors = require("cors");

// Middleware
app.use(cors());
app.use(express.json());

const { MongoClient, ServerApiVersion } = require("mongodb");

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
    const database = client.db("yoga-master"); // Your database name
    const classesCollection = database.collection("classes"); // Your collection name

    // Create a new class
    app.post("/new-class", async (req, res) => {
      try {
        const newClass = req.body;
        const result = await classesCollection.insertOne(newClass);
        res.status(201).send(result);
      } catch (error) {
        console.error("Error creating new class:", error);
        res.status(500).send({ message: "Internal Server Error" });
      }
    });

    // Get all approved classes
    app.get("/classes", async (req, res) => {
      try {
        const query = { status: "approved" };
        const result = await classesCollection.find(query).toArray();
        res.send(result);
      } catch (error) {
        res.status(500).send({ error: "An error occurred while fetching classes." });
      }
    });

    // Get classes by instructor email
    app.get("/classes/:email", async (req, res) => {
      const email = req.params.email;
      const query = { instructorEmail: email };

      try {
        const result = await classesCollection.find(query).toArray();
        res.status(200).send(result);
      } catch (error) {
        console.error("Error fetching classes:", error);
        res.status(500).send({ message: "Internal Server Error" });
      }
    });

    // Manage classes
    app.get("/classes-manage", async (req, res) => {
      try {
        const result = await classesCollection.find().toArray();
        res.send(result);
      } catch (error) {
        console.error("Error fetching classes:", error);
        res.status(500).send({ message: "Internal Server Error" });
      }
    });

    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Mongo DB");
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

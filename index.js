const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require("dotenv").config()
const app = express();


// middle ware
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.wjuepub.mongodb.net/?retryWrites=true&w=majority`;
// console.log(uri)
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });



async function run() {
    try {
        const postCollection = client.db('Social-app').collection('posts');
        const usersCollection = client.db('Social-app').collection('users');


        app.get('/posts', async (req, res) => {
            const query = {}
            const result = await postCollection.find(query).toArray();
            res.send(result);
        })

        app.post('/addapost', async (req, res) => {
            const post = req.body;
            // console.log(post);
            const result = await postCollection.insertOne(post);
            res.send(result);
        });

        app.post('/about', async (req, res) => {
            const details = req.body;
            const filter = { email: body.email }
            const options = { upsert: true };
            const updatedDoc = {
                $set: {
                    Adress: details.Adress,
                    name: details.name,
                    university: details.university
                }
            }
            const result = await usersCollection.updateOne(filter, updatedDoc, options);
            res.send(result);
        });

        app.get('/about/:email', async (req, res) => {
            const email = req.params.email;
            const query = { email: email }
            const user = await usersCollection.findOne(query);
            res.send(user);
        })

        app.post('/users', async (req, res) => {
            const user = req.body;
            const result = await usersCollection.insertOne(user);
            res.send(result);
        });

    }
    finally {

    }
}
run().catch(console.log);




app.get("/", async (req, res) => {
    res.send("Social server running")
})

app.listen(port, () => console.log("Social running............."))
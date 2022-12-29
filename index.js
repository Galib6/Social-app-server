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


        app.get('/posts', async (req, res) => {
            const query = {}
            const result = await postCollection.find(query).toArray();
            res.send(result);
        })

        app.post('/addapost', async (req, res) => {
            const product = req.body;
            // console.log(product);
            const result = await postCollection.insertOne(product);
            res.send(result);
        });




        app.delete('/buyer/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: ObjectId(id) };
            const result = await usersCollection.deleteOne(filter);
            res.send(result);
        })




        //_____________________________________



        app.post('/gsignup', async (req, res) => {
            const product = req.body;
            // console.log(product);
            const result = await usersCollection.insertOne(product);
            res.send(result);
        });



        app.delete('/deleteproduct/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: ObjectId(id) };
            const result = await productsCollection.deleteOne(filter);
            res.send(result);
        })


    }
    finally {

    }
}
run().catch(console.log);




app.get("/", async (req, res) => {
    res.send("Social server running")
})

app.listen(port, () => console.log("Social running............."))
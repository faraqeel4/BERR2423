const express = require('express')
const app = express()
const port = process.env.PORT || 3000;
const bcrypt = require('bcrypt');

app.use(express.json())

    //new user registeration
    app.post('/user',async (req, res) => {
      //insertOne the registeration data to mongo
      const hash = bcrypt.hashSync(req.body.password, 10);


      //console.log(req.body)
      let result = await client.db("maybank").collection("testing").insertOne(
        {
          username: req.body.username,
          password: hash,     //tukar raw password to hash
          name: req.body.name,
          email: req.body.email,
        }
      )
      res.send(result)
    })

app.get('/', (req, res) => {
   res.send('Hello World!')
})

app.listen(port, () => {
   console.log(`Example app listening on port ${port}`)
})


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://aqeelahfarah:aaqqeellaahh@cluster0.vjritzz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

    client.db('maybank').collection('testing').insertOne(
    {
      subject: 'BENR2243',
      descriptian: 'Data base and Cloud',
      code: 'Benr',
      Credit: '3',
    })

    let testing = await client.db('maybank').collection('testing').find().toArray()
    console.log(testing)

    let update = await client.db('maybank').collection('testing').updateOne(
      { code: 'BENR 1111'},
      {$set: {
        description: 'Data Science',
        lecturer: 'Dr Soo',
        semester: 3
      }
      }
    )
    console.log (update)

    let deleted = await client.db('maybank').collection('testing').deleteOne(
      {
        _id: new ObjectId ('660b62b87be49f5e15138444')
      }
    )
    
    app.get('/hello',(req, res) =>
    {
      res.send('BERR 2423 Database')
    })




  } finally {
    // Ensures that the client will close when you finish/error;
  }
}
run().catch(console.dir);


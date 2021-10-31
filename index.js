const express = require('express')
const app = express()
const port = process.env.PORT || 5000;

const cors = require('cors')
const { MongoClient } = require('mongodb');

const ObjectId = require('mongodb').ObjectId

//user:mydbUser1
// password :OzqMo4DJdyQnuxNl

//middle ware//
app.use(cors ());
app.use(express.json());
//middle ware//


//connect to data base and node server code start//
const uri = "mongodb+srv://mydbUser1:cLNLMdZgklQCLXqe@cluster0.bs9pl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
//connect to data base and node server code end//

async function run() {
    try {
        await client.connect();
        const database = client.db("travel");
        const PackagesColloction = database.collection("Packages");
        const orderColloction = database.collection("order");


    //GEt  Find Multiple Documents Client site read code//
        app.get('/Packages',async(req, res) =>{
            const cursor = PackagesColloction.find({});
            const Packages= await cursor.toArray();
            res.send(Packages)
        })
    //GEt  Find Multiple Documents Client site read code//



    // GET Find single Document Client site read code//
     app.get('/Packages/:id',async (req, res) =>{
        const id = req.params.id;
        const query = {_id:ObjectId(id)};
        const Packages = await PackagesColloction.findOne(query);
        res.send(Packages)
     })

    // GET Find single Document Client site read code//



    //find booking data//
    app.get('/order',async(req, res) =>{
      const cursor = orderColloction.find({});
      const order= await cursor.toArray();
      res.send(order)
  })
    //find booking data//



    //find my booking data//
    app.get("/myOrder/:email", async (req, res) => {
      const result = await orderColloction.find({
        email: req.params.email,
      }).toArray();
      res.send(result);
    });




    //find my booking data//



    // POST Api Creact//
        app.post('/Packages',async(req, res)=>{
            const Packages = req.body;
            const result = await PackagesColloction.insertOne(Packages);
            res.send(result);  
        })
    // POST Api Creact//


    //Order/Booking api//
    app.post('/order',async(req, res)=>{
      const order = req.body;
      const result = await orderColloction.insertOne(order);
      res.send(result);  
  })
    //Order/Booking api//


    //Delete APi code//
      app.delete('/order/:id', async (req, res)=>{
        const id = req.params.id;
        const query = {_id:ObjectId(id)};
        const result = await orderColloction.deleteOne(query)
        res.json(result)
      })
    //Delete APi code//

    //my order delet code //
    app.delete('/myOrder/:id', async (req, res)=>{
      const id = req.params.id;
      const query = {_id:ObjectId(id)};
      const result = await orderColloction.deleteOne(query)
      res.json(result)
    })



    //my order delet code //
    
      } 
      
      finally {
        // await client.close();
      }

}

run().catch(console.dir);



app.get('/', (req, res) => {
    res.send('Hello World!')
  })



  
  app.listen(port, () => {
    console.log("Example" , port)
  })
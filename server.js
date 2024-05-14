const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
const app = express();
const PORT = 3000;
require('dotenv').config();
app.use('/css',express.static('css'));
app.use('/images',express.static('images'));


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());;

//connect to mongodb
const uri = process.env.MONGO_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
async function connectToMongoDB() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

//get index.html
app.get('/',(req,res)=>{
    res.sendFile(__dirname+"/index.html");
})
//about.html
app.get('/about',(req,res)=>{
    res.sendFile(__dirname+"/about.html");
})
//contact.html
app.get('/contact',(req,res)=>{
    res.sendFile(__dirname+"/contact.html");
})
//gallery.html
app.get('/gallery',(req,res)=>{
    res.sendFile(__dirname+"/gallery.html");
})
//projects.html
app.get('/projects',(req,res)=>{
    res.sendFile(__dirname+"/projects.html");
})
//success.html
app.get('/success',(req,res)=>{
    res.sendFile(__dirname+"/success.html");
})

//post for submit-form
app.post('/submit', async (req, res) => {
    try {
        const db = client.db('contact');
        const collection = db.collection('datas');
        const { Name, PhoneNo, Typeofenquiry, Message } = req.body;
        const result = await collection.insertOne({ Name, PhoneNo, Typeofenquiry, Message });
        res.status(200).json({ message: 'Data inserted successfully' });
    } catch (error) {
        console.error('Error inserting data into MongoDB:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
async function startServer() {
    await connectToMongoDB();
    app.listen(PORT, () => {
        console.log(`Server is running on port http://localhost:${PORT}`);
    });
}
startServer();

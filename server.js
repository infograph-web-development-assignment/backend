const express = require('express');
const cors = require('cors');
require('dotenv').config();
const server = express();
server.use(cors());
server.use(express.json());
const Port = process.env.PORT;
const mongoose = require('mongoose');

// connecting mongodb
mongoose.connect('mongodb://localhost:27017/infograph', { useNewUrlParser: true, useUnifiedTopology: true });


// show port number
server.listen(Port,console.log(`server listening on port: ${Port}`));


// making schema for the data
const MyDigiSchema = new mongoose.Schema({
    name: String,
    level:String,
    img:String
  });

  //creating a model
const MyDigiModel = mongoose.model('infograph',MyDigiSchema);


server.get('/',(req,res)=>{
    res.send("sever is alive");
})

//get the path for adding to database function
server.post('/addToFav', addToFavHandler);


//this function is to add the data in database
function addToFavHandler(req,res)
{
    // console.log('test');
    const {name,level,img} = req.body;
    const saver = new MyDigiModel({
        name:name,
        level:level,
        img:img
    })
    console.log(saver);
    saver.save()

}




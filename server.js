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

//path for getting data from database function
server.get('/getFavoritedData',getFavoritedDataHandler);

// get path and info for deleting from database
server.delete('/deleteFromFavs/:id',deleteFromFavsHandler);


// This function is to add the data in database
function addToFavHandler(req,res)
{
    const {name,level,img} = req.body;
    const saver = new MyDigiModel({
        name:name,
        level:level,
        img:img
    })
    console.log(saver);
    saver.save()

}

// Function to find all saved data in database and send it back to frontend
function getFavoritedDataHandler(req,res)
{
    MyDigiModel.find({},(err,data)=>{
        res.send(data);
    })
}


//function deletes frpom database and sends back all other saved data
function deleteFromFavsHandler(req,res)
{
    const {id} = req.params;
    //To remove data from database depending on the id
    MyDigiModel.remove({_id:id},(err,data)=>{
        //To find and send back all other saved data after deleting the specific item
        MyDigiModel.find({},(err,data)=>{
            res.send(data);
        })
    })
}


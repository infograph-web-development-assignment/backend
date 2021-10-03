const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const routesUrls = require('./routes/routes');
const cors = require('cors');
dotenv.config();
const Port = process.env.PORT;
// connecting mongodb (Atlas)
mongoose.connect(process.env.DATABASE_ACCESS,()=>console.log("database is connected"))

app.use(express.json());
app.use(cors());

//to append routeUls to base path (/app)
app.use('/app', routesUrls)

// make sure server running on right port number
app.listen(3004,console.log(`app listening on port: ${3004}`));












// making schema for the data
const MyDigiSchema = new mongoose.Schema({
    name: String,
    level:String,
    img:String
  });

  //creating a model
const MyDigiModel = mongoose.model('infograph',MyDigiSchema);


app.get('/',(req,res)=>{
    res.send("sever is alive");
})

//get the path for adding to database function
app.post('/addToFav', addToFavHandler);

//path for getting data from database function
app.get('/getFavoritedData',getFavoritedDataHandler);

// get path and info for deleting from database
app.delete('/deleteFromFavs/:id',deleteFromFavsHandler);


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


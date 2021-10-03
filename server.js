/** @format */

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const routesUrls = require("./routes/routes");
const cors = require("cors");
dotenv.config();
const Port = process.env.PORT;
// connecting mongodb (Atlas)
mongoose.connect(process.env.DATABASE_ACCESS, () =>
  console.log("database is connected")
);

app.use(express.json());
app.use(cors());

//to append routeUls to base path (/app)
app.use("/app", routesUrls);

// make sure server running on right port number
app.listen(3004, console.log(`app listening on port: ${3004}`));

const MyProjectOwnerSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const MyProjectOwnerModel = mongoose.model(
  "projectOwner",
  MyProjectOwnerSchema
);

app.post("/savePojectOwner", savePojectOwnerHandler);
app.get("/getSavedProjectOwners", getSavedProjectOwnersHandler);

function savePojectOwnerHandler(req, res) {
  const { username, password } = req.body;
  const saver = new MyProjectOwnerModel({
    username: username,
    password: password,
  });
  console.log(saver);
  saver.save();
}

function getSavedProjectOwnersHandler(req, res) {
  MyProjectOwnerModel.find({}, (err, data) => {
    res.send(data);
  });
}

// Schema for fund request
const MyProjectFormSchema = new mongoose.Schema({
  sector: String,
  projectName: String,
  description: String,
  status:String
});

const MyProjectFormModel = mongoose.model("projectForm", MyProjectFormSchema);
app.post("/sendTheFund", sendTheFundHandler);
app.get('/getapResult',getapResultHandler);

function sendTheFundHandler(req, res) {
  const { sector, projectName, description,status } = req.body;
  const saver = new MyProjectFormModel({
    sector: sector,
    projectName: projectName,
    description: description,
    status:status
  });
  console.log(saver);
  saver.save();
}


  function getapResultHandler(req,res)
  {
    MyProjectFormModel.find({}, (err, data) => {
        res.send(data);
      });
  }
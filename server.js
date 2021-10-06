const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();
const Port = process.env.PORT;
// connecting mongodb (Atlas)
mongoose.connect(process.env.DATABASE_ACCESS, () =>
  console.log("database is connected")
);

app.use(express.json());
app.use(cors());

// make sure server running on right port number
app.listen(3004, console.log(`app listening on port: ${3004}`));

// Schema for project owners

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
  saver.save();
}

function getSavedProjectOwnersHandler(req, res) {
  MyProjectOwnerModel.find({}, (err, data) => {
    res.send(data);
  });
}

// Schema for admin
const MyAdminSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const MyAdminModel = mongoose.model(
  "Admins",
  MyAdminSchema
);


app.post("/saveAdmin", saveAdminHandler);
app.get("/getSavedAdmins", getSavedAdminsHandler);

function saveAdminHandler(req, res) {
  const { username, password } = req.body;
  const saver = new MyAdminModel({
    username: username,
    password: password,
  });
  saver.save();
  console.log(saver)
}

function getSavedAdminsHandler(req, res) {
  MyAdminModel.find({}, (err, data) => {
    res.send(data);
  });
  console.log('all admins are back to frontend')
}


// Schema for fund request
const MyProjectFormSchema = new mongoose.Schema({
  sector: String,
  projectName: String,
  description: String,
  status: String,
});

// Create model for fund form
const MyProjectFormModel = mongoose.model("projectForm", MyProjectFormSchema);

// use POSTt for path sendTheFund 
app.post("/sendTheFund", sendTheFundHandler);
// Use get for path getapResult 
app.get("/getapResult", getapResultHandler);
// Use put for path updateStatus
app.put("/updateStatus/:id", updateStatusHandler);

// Fucntion for saving the data we get from frontend in database
function sendTheFundHandler(req, res) {
  const { sector, projectName, description, status } = req.body;
  const saver = new MyProjectFormModel({
    sector: sector,
    projectName: projectName,
    description: description,
    status: status,
  });
  saver.save();
}

// Function to send all data in database to frontend
function getapResultHandler(req, res) {
  MyProjectFormModel.find({}, (err, data) => {
    res.send(data);
  });
}

// Function to delete depending on the id we get from frontend then save in database the new data, then send back all data
function updateStatusHandler(req, res) {
  const { status } = req.body;
  const { id } = req.params;
  MyProjectFormModel.findOne({ _id: id }, (error, data) => {
    data.status = status,
      data.save().then(() => {
        MyProjectFormModel.find({}, (error, data) => {
          res.send(data);
        });
      });
  });
}





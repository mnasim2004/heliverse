
var express = require('express');
var mongoose=require('mongoose');
var cors=require("cors");
var path = require('path');

var UserModel =require("../user");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes');

var app = express();
const { db } = require('./db');
db();



app.use(cors());
app.use(express.json());

app.get("/users",(req,res)=>{
  UserModel.find()
  .then(users=> res.json(users))
  .catch(err=> res.json(error))
})



app.listen(5000, () => {
  console.log("Server running on port{5000}");
      });

module.exports = app;

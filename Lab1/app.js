console.log('Hello nodemon');

const fs = require('fs');
//dung cai thu vien express
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config.json');
const imageRouter = require(__dirname + '/modules/api/images/');
var app = express();
//set public folder public
//app.use(urlencoded)
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/addImage.html');
})

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json({
  extended: true
}));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use('/api/image',imageRouter);
mongoose.connect(config.connectionString, (err)=>{
  if(err){
    console.log(err);
  }else {
    console.log('Connect db success');
  }
})

//mo 1 cai port de chay local
app.listen(config.port, (req, res) => {
  console.log('app listen on 6969');
})

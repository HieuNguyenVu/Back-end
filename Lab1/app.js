console.log("Hello World");

const fs = require('fs');
// Dùng thư viện express
const express = require('express');

var app = express(); //express là hàm của thư viện

// Set piblic foder public
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
  res.send('./public/addimage.html');
})

fs.exists('imageData.json', function(exists) {
  if (exists) {
    console.log("yes file exists");
  } else {
    fs.writeFileSync('imageData.json', "[]");
  }
})
app.get('/image/add', function(req, res) {
  var imageInfor = {
    name: req.query.name,
    imageLink: req.query.imageLink,
    description: req.query.description
  }
  /*fs.writeFileSync('imageData.json', JSON.stringify(imageInfor));*/
  let data = JSON.parse(fs.readFileSync('imageData.json', 'utf-8'));
  data.push(imageInfor);
  fs.writeFileSync('imageData.json', JSON.stringify(data));
  backURL = req.header('Referer') || '/';
  res.redirect(backURL);
  /*alert("success");*/
})

app.get('/image/get', function(req, res) {
  var arr = fs.readFileSync('imageData.json', "utf8");
  var dataJSON = JSON.parse(arr);
  console.log(dataJSON);
  var html = '';
  dataJSON.forEach(data => {
    html += "<p>Ten anh: " + data.name + "</p>" + "<img src='" + data.imageLink + "'></br>" + "<p>Noi dung: " + data.description + "</p>";
  });
  res.send(html);
})

// mở 1 cái port để chạy local
app.listen(6969, function(req, res) {
  console.log('app listen on 6969');
})

console.log('Hello nodemon');

const fs = require('fs');
//dung cai thu vien express
const express = require('express');
const bodyParser = require('body-parser');
const imagesController = require(__dirname + '/modules/images/imagesController');
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

app.post('/image', (req, res) => {
  //doc du lieu
  var imageInfoCollection = [];
  imageInfoCollection = imagesController.fetchImage();
  //khai bao object
  var imageInfo = {
    id: Object.keys(imageInfoCollection).length + 1,
    name: req.body.name,
    imageLink: req.body.imageLink,
    description: req.body.description
  }
  //push datamoi vao collection

  console.log(imageInfo);
  imageInfoCollection.push(imageInfo);
  //luu lai vao file
  // fs.writeFileSync('imageData.json', JSON.stringify(imageInfoCollection));
  imagesController.saveImage(imageInfoCollection);
  //bao thanh cong
  res.send('Success');
})

app.put('/image', (req, res) => {
  var imageInfo = {
    id: req.body.id,
    name: req.body.name,
    imageLink: req.body.imageLink,
    description: req.body.description
  }
  var imageInfoCollection = [];
  imageInfoCollection = imagesController.fetchImage();
  imageInfoCollection.forEach((data) => {
    if (data.id == imageInfo.id) {
      data.name = imageInfo.name;
      data.imageLink = imageInfo.imageLink;
      data.description = imageInfo.description;
    }
  })
  imagesController.saveImage(imageInfoCollection);
  res.send('Success');

})
app.delete('/image', (req, res) => {
  var imageInfo = {
    id: req.body.id
  }
  var imageInfoCollection = [];
  imageInfoCollection = imagesController.fetchImage();
  imageInfoCollection.splice(imageInfo.id - 1, 1);
  imagesController.saveImage(imageInfoCollection);
  res.send('Success');
})
app.get('/image', (req, res) => {
  console.log('image get');
  var htmlString = '';
  var imageInfoCollection = [];
  imageInfoCollection = imagesController.fetchImage();
  imageInfoCollection.forEach((data) => {
    htmlString += `<div>${data.id}</div><div>${data.name}</div><img src="${data.imageLink}"><div>${data.description}</div>`;
  })
  res.send(htmlString);
})

//mo 1 cai port de chay local
app.listen(6969, (req, res) => {
  console.log('app listen on 6969');
})

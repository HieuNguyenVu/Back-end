const express = require('express');
const Router = express.Router();
const imagesController = require('./imagesController');

Router.post('/', (req, res) => {
  try {
    var image = {
      name: req.body.name,
      imageLink: req.body.imageLink,
      description: req.body.description
    }
    imagesController.addImage(image).then((result) =>{
      res.send(result);
    })
  } catch (e) {
    console.log(e);
  }
})

Router.get('/', (req, res) => {
  try {
    if (req.query.id) {
      console.log(req.query.id);
      imagesController.getImageById(req.query.id).then((result) => {
        res.send(result);
      });
    } else {
      imagesController.getAllImage().then((result) => {
        res.send(result);
      });
    }
  } catch (e) {
    console.log(e);
  }
})

Router.put('/', (req, res) => {
  try {
    if (req.body.id) {
      var data = {
        name: req.body.name,
        imageLink: req.body.imageLink,
        description: req.body.description
      }
      console.log(data);
      imagesController.updateImage(req.body.id, data).then((result) => {
        if (result.ok == 1) {
          res.send('Success');
        }
      });
    }
  } catch (e) {

  }
})

Router.delete('/', (req, res) => {
  try {
    imageInfoCollection = imagesController.removeImage(req.body.id).then((result) => {
      res.send('Success');
    });
  } catch (e) {
    console.log(e);
  }
})

module.exports = Router;

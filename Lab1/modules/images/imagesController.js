const fs = require('fs')
const express = require('express');

var fetchImageCollection = () =>{
  var imageInfoCollection = [];
  try {

    var contents = fs.readFileSync('imageData.json', 'utf-8');
    imageInfoCollection = JSON.parse(contents);

  } catch (e) {

    console.log(e);

  }
  return imageInfoCollection;
}

var saveImageCollection = (data)=>{
  fs.writeFileSync('imageData.json',JSON.stringify(data));
}

module.exports = {
  fetchImage : fetchImageCollection,
  saveImage : saveImageCollection
}

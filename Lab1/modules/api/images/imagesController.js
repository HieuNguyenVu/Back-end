const fs = require('fs')
const express = require('express');
const imagesModel = require('./imagesModel');
const mongoose = require('mongoose');
ObjectID = mongoose.ObjectID;

var getAllImage = () => {
  return imagesModel.find({});
}

var getImageById = (id) => {
  return imagesModel.find({'_id': id});
}

var addImage = (data) => {
  return imagesModel.create({data});
}
var updateImage = (id, newData) => {
  return imagesModel.update({_id:id}, newData);
}

var removeImage = (id) => {
  return imagesModel.deleteOne({_id:id});
}

module.exports = {
  getAllImage,
  getImageById,
  updateImage,
  removeImage,
  addImage
}

const mongoose = require('mongoose');
const schema = mongoose.Schema;

var imagesModel = new schema({
  id: {  type: Number,  require: true},
  name: {  type: String,  default: ''},
  imageLink: {  type: String,  default: ''  },
  description: {type: String },
  views: {type: Number,default: 0},
  likes: [{ likeBy: {type:Number} }],
  comments: [{
    commentBy: {type: Number},
    comment: {type: String}
  }]

});

module.exports = mongoose.model('images',imagesModel);

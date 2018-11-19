const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    name: {
      type: String,
      require: true
    },
    avatar: {
      type: String,
      require: true
    }
  },
  createdTime: {
    type: Date,
    required: true
  },
  published: {
    type: Boolean,
    required: true,
    default: false
  },
  publishTime: {
    type: Date,
    required: true,
    default: new Date()
  }
});

module.exports = mongoose.model('Article', ArticleSchema);

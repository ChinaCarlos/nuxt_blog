const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    require: true
  },
  title: {
    type: String,
    require: true
  },
  wrapper: {
    type: String,
    default: ''
  },
  content: {
    type: String,
    require: true
  },
  published: {
    type: Boolean,
    default: false
  },
  views: {
    type: Number,
    default: 0
  },
  likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  category: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
  tags: [{ type: Schema.Types.ObjectId, ref: 'Tag' }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  publishedAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});
ArticleSchema.options.toJSON = {
  virtuals: true,
  versionKey: false,
  transform(doc, ret) {
    ret.id = ret._id;
    delete ret._id;
  }
};
module.exports = mongoose.model('Article', ArticleSchema);

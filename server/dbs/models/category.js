const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CategorySchema = new Schema({
  name: {
    type: String,
    require: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    require: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

CategorySchema.options.toJSON = {
  virtuals: true,
  versionKey: false,
  transform(doc, ret) {
    ret.id = ret._id;
    delete ret._id;
  }
};

module.exports = mongoose.model('Category', CategorySchema);

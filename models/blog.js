const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema({
  title: {
    type: String,
    required: [true,"Please enter a title"],
  },
  body: {
    type: String,
    required: [true,'Please enter a content for blog'],
  },
  postedby:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',
    required:true,
  }
}, { timestamps: true });

const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;
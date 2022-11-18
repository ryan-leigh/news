require("dotenv").config();
const mongoose = require('mongoose');

console.log(process.env.DB_NAME);

const connection = async () => {
  await mongoose.connect(`mongodb://localhost:27017/${process.env.DB_NAME}`);
}

connection();
const articleSchema = new mongoose.Schema(
  {
    newsCatcherId: String,
    title: String,
    author: String,
    published_date: Date,
    articleUrl: String,
    mediaUrl: String,
    excerpt: String,
    summary: String,
    topic: String,
    isOpinion: Boolean,
    publisher: String,
    publisherCleanUrl: String
  }
);
const Article = new mongoose.model('Article', articleSchema);

const publisherSchema = new mongoose.Schema(
  {
    name: String,
    cleanUrl: String,
  }
)
const Publisher = new mongoose.model('Publisher', publisherSchema);

module.exports = {
  Article: Article,
  Publisher: Publisher
}
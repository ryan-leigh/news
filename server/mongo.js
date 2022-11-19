require("dotenv").config();
const mongoose = require('mongoose');

console.log(process.env.DB_NAME);

mongoose.connect(`mongodb://127.0.0.1:27017/${process.env.DB_NAME}`)
  .then(() => console.log('connected!'))

const dbExport = {};

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

const topicSchema = new mongoose.Schema(
  {
    name: String,
    publishers: Array,
  }
)
const Topic = new mongoose.model('Topic', topicSchema);

dbExport.Article = Article;
dbExport.Topic = Topic;
console.log('after!');

module.exports = dbExport;
const topics = ['news', 'sport', 'world', 'tech', 'finance', 'politics', 'business', 'economics', 'entertainment', 'beauty', 'travel', 'music', 'food', 'science', 'gaming', 'energy'];
const {Topic} = require('../mongo.js');

const topicController = (req, res) => {
  Topic.find({})
    .then(results => {
      res.status(200);
      res.end(JSON.stringify(results));
    })

}

module.exports = topicController;

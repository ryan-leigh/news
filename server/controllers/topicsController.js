const topics = ['news', 'sport', 'world', 'tech', 'finance', 'politics', 'business', 'economics', 'entertainment', 'beauty', 'travel', 'music', 'food', 'science', 'gaming', 'energy'];

const topicController = (req, res) => {
  res.status(200);
  res.end(JSON.stringify(topics));
}

module.exports = topicController;

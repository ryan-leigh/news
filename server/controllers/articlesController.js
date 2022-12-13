const {Article} = require('../mongo.js');


const articlesController = async (req, res) => {
  if (req.query.hasOwnProperty('topics')) {
    console.log(req.query.topics);
    console.log(req.query.publishers)
    const topics = req.query.topics.split(',');
    const publishers = req.query.publishers.split(',');
    await Article.find({'topic' : {$in : topics}, 'publisher': {$in : publishers}}).sort({published_date: -1}).limit(100)
      .then((results) => {
        console.log('results: ', results);
        res.status(200);
        res.end(JSON.stringify(results));
      })
      .catch((err) => {
        console.log(err);
        res.status(500);
        res.end();
      })
  } else {
    await Article.find({}).sort({published_date: -1}).limit(100)
      .then((results) => {
        console.log('2')
        console.log('results: ', results);
        res.status(200);
        res.end(JSON.stringify(results));
      })
      .catch((err) => {
        console.log(err);
        res.status(500);
        res.end();
      })
  }
}

module.exports = articlesController;
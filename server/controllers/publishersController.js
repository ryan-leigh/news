const {Publisher} = require('../mongo.js');

const publisherController = async (req, res) => {
  await Publisher.find({})
    .then((result) => {
      res.status(200);
      res.end(JSON.stringify(result));
    })
    .catch((err) => {
      console.log(err);
      res.status(500);
      res.end();
    })
}

module.exports = publisherController;
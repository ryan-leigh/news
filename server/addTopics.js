const {Article, Topic} = require('./mongo.js');

const main = async () => {
  const topics = ['news', 'sport', 'world', 'tech', 'finance', 'politics', 'business', 'economics', 'entertainment', 'beauty', 'travel', 'music', 'food', 'science', 'gaming', 'energy'];
  await Topic.find({name: 'news'})
    .then(result => console.log(result));
  await Topic.remove({})
    .then(() => console.log('Topics removed!'))
  await Article.remove({})
    .then(() => console.log('Articles removed!'));
  for (let i = 0; i < topics.length; i++) {
    const newTopic = new Topic({
      name: topics[i],
      publishers: []
    });
    await newTopic.save()
      .then(result => console.log('saved! ', result));
  }
  Topic.find({name: 'news'})
    .then(result => console.log(result));
}
main();







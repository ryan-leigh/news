const Axios = require('axios');

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const getNews = async () => {
  const sourcesString = "nytimes.com,cnn.com,pbs.org,npr.org,foxnews.com,nypost.com,abcnews.go.com,politico.com,cbsnews.com,msnbc.com,nbcnews.com,usatoday.com,washingtonpost.com,bloomberg.com,vice.com,hbo.com,huffpost.com,tmz.com,cnet.com, hollywoodreporter.com,newsweek.com,newyorker.com,time.com,usnews.com,bbc.com,sports.yahoo.com,bleacherreport.com,si.com,foxsports.com,cbssports.com,sbnation.com,nbcsports.com,eonline.com,people.com,popsugar.com,variety.com,wired.com,techcrunch.com,vox.com,mashable.com,foxbusiness.com,forbes.com,economist.com,wsj.com"
  Axios.get(`https://api.newscatcherapi.com/v2/latest_headlines?when=1h&lang=en&countries=US&sources=${sourcesString}&page_size=100`, {headers: {"x-api-key": "uCwNDOcmDX1J32GPDi2--4XSjynkyh_4zSEVUSrLywc"}})
  .then((response) => {
    const updatedTopics = {};
    const {Article, Topic} = require('./mongo.js');
    console.log(response.data.articles);
    for (let i = 0; i < response.data.articles.length; i++) {
      console.log(response.data.articles[i])
      const newArticle = new Article({
        newsCatcherId: response.data.articles[i]._id,
        title: response.data.articles[i].title,
        author: response.data.articles[i].author,
        published_date: response.data.articles[i].published_date,
        articleUrl: response.data.articles[i].link,
        mediaUrl: response.data.articles[i].media,
        excerpt: response.data.articles[i].excerpt,
        summary: response.data.articles[i].summary,
        topic: response.data.articles[i].topic,
        isOpinion: response.data.articles[i].is_opinion,
        publisher: response.data.articles[i].clean_url,
        publisherCleanUrl: response.data.articles[i].clean_url
      });
      newArticle.save()
        .then(result => {
          console.log('saved doc', result);
          Topic.findOne({name: response.data.articles[i].topic})
            .then(async topic => {
              console.log('topic result: ', topic);
              if (!(updatedTopics.hasOwnProperty(topic.name))) {
                updatedTopics[topic.name] = [];
              }
              if (!(topic.publishers.includes(response.data.articles[i].clean_url)) && !(updatedTopics[topic.name].includes(response.data.articles[i].clean_url))) {
                console.log('does not include!');
                updatedTopics[topic.name].push(response.data.articles[i].clean_url);
                await Topic.updateOne({name: response.data.articles[i].topic}, {$push: {publishers: response.data.articles[i].clean_url}})
                  .then(() => console.log('updated! ', response.data.articles[i].clean_url, ' ', response.data.articles[i].topic))
              }
            })
        })
    }
  })
  .catch((err) => {
    console.log(err);
  })
}


const timer = async () => {
  while (1 !== 0) {
    const currentTime = new Date();
    if (currentTime.getMinutes() === 25 && currentTime.getSeconds() === 0) {
      getNews();
      await sleep(2000);
    }
  }
}
timer();


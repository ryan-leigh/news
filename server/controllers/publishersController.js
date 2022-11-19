const {Publisher} = require('../mongo.js');

const publisherController = (req, res) => {
  const sourcesString = "nytimes.com, cnn.com, pbs.org, npr.org, foxnews.com, nypost.com, abcnews.go.com, politico.com, cbsnews.com, msnbc.com, nbcnews.com, usatoday.com, washingtonpost.com, bloomberg.com, vice.com, hbo.com, huffpost.com, tmz.com, cnet.com,  hollywoodreporter.com, newsweek.com, newyorker.com, time.com, usnews.com, bbc.com, sports.yahoo.com, bleacherreport.com, si.com, foxsports.com, cbssports.com, sbnation.com, nbcsports.com, eonline.com, people.com, popsugar.com, variety.com, wired.com, techcrunch.com, vox.com, mashable.com, foxbusiness.com, forbes.com, economist.com, wsj.com"

  res.status(200);
  res.end(JSON.stringify(sourcesString.split(', ')))

}

module.exports = publisherController;
import React from 'react';
import Axios from 'axios';
import Header from './Header.jsx';
import TopicsList from './TopicsList.jsx';
import PublishersList from './PublishersList.jsx';
import Update from './Update.jsx'
import Feed from './Feed.jsx'
const {useState, useEffect} = React;

const App = () => {
  const [articles, setArticles] = useState([]);
  const [selectedArticles, setSelectedArticles] = useState([]);
  const [topics, setTopics] = useState([]);
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [publishers, setPublishers] = useState([]);
  const [selectedPublishers, setSelectedPublishers] = useState([]);
  const [userStrikedPublishers, setUserStrikedPublishers] = useState([]);
  const [userWhitelistedPublishers, setUserWhitelistedPublishers] = useState([]);
  const [under100RequestSent, setUnder100RequestSent] = useState(false);

  // get topics, publishers, and articles
  useEffect(() => {
    Axios.get('http://localhost:3000/topics')
      .then(response => {
        console.log(response.data)
        setTopics(response.data);
        setSelectedTopics(response.data);
      });
    Axios.get('http://localhost:3000/publishers')
      .then(response => {
        console.log(response.data)
        setPublishers(response.data);
        setSelectedPublishers(response.data);
      });
    Axios.get(`http://localhost:3000/articles`)
      .then(response => {
        setArticles(response.data);
      });
  }, []);

  // strikeout irrelevant publishers when selcted topics changes
  // inlude whitelisted publishers and don't include publishers striked by the user
  useEffect(() => {
    const newSelectedPublishers = [];
    for (let i = 0; i < selectedTopics.length; i++) {
      console.log(i, ' ', selectedTopics[i]);
      for (let j = 0; j < selectedTopics[i].publishers.length; j++) {
        console.log('striked ', userStrikedPublishers);
        if (!(userStrikedPublishers.includes(selectedTopics[i].publishers[j]))) {
          console.log('pushing')
          newSelectedPublishers.push(selectedTopics[i].publishers[j]);
        }
      }
    }
    for (let i = 0; i < userWhitelistedPublishers; i++) {
      if (!(newSelectedPublishers.includes(userWhitelistedPublishers[i]))) {
        newSelectedPublishers.push(userWhitelistedPublishers[i]);
      }
    }
    setSelectedPublishers(newSelectedPublishers.sort())
  }, [selectedTopics])

  console.log('selected: ', selectedPublishers);

  return (
    <div className="page_columns">
      <Header />
      <main>
        <TopicsList topics={topics} selectedTopics={selectedTopics} setSelectedTopics={setSelectedTopics} />
        <PublishersList publishers={publishers} selectedPublishers={selectedPublishers} setSelectedPublishers={setSelectedPublishers} userStrikedPublishers={userStrikedPublishers} setUserStrikedPublishers={setUserStrikedPublishers} userWhitelistedPublishers={userWhitelistedPublishers} setUserWhitelistedPublishers={setUserWhitelistedPublishers} />
        <Update selectedTopics={selectedTopics} selectedPublishers={selectedPublishers} />
        <Feed articles={articles} />
      </main>
    </div>
  )
}

export default App;

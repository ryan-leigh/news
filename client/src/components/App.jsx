import React from 'react';
import Axios from 'axios';
import Header from './Header.jsx';
import TopicsList from './TopicsList.jsx';
import PublishersList from './PublishersList.jsx';
import Update from './Update.jsx'
import Feed from './Feed.jsx'
const {useState, useEffect} = React;

const App = () => {
  const [loginPage, setLoginPage] = useState(true);
  const [infoForm, setInfoForm] = useState(false);
  const [topicsAndPublishersPage, setTopicsAndPublishersPage] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
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
      });
    Axios.get('http://localhost:3000/publishers')
      .then(response => {
        console.log(response.data)
        setPublishers(response.data);
      });
    Axios.get(`http://localhost:3000/articles`)
      .then(response => {
        setArticles(response.data);
      });
  }, []);

  // strikeout irrelevant publishers when selected topics changes
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
    for (let i = 0; i < userWhitelistedPublishers.length; i++) {
      if (!(newSelectedPublishers.includes(userWhitelistedPublishers[i]))) {
        newSelectedPublishers.push(userWhitelistedPublishers[i]);
      }
    }
    setSelectedPublishers(newSelectedPublishers.sort())
  }, [selectedTopics])

  console.log('selected: ', selectedPublishers);

  if (loggedIn) {
    return (
      <div className="whole">
        <Header />
        <div class="subhead">Wednesday November 23, 2022</div>
        <main>
          <div className="filter_list_heading">Topics</div>
          <TopicsList topics={topics} selectedTopics={selectedTopics} setSelectedTopics={setSelectedTopics} />
          <div className="filter_list_heading">Publishers</div>
          <PublishersList publishers={publishers} selectedPublishers={selectedPublishers} setSelectedPublishers={setSelectedPublishers} userStrikedPublishers={userStrikedPublishers} setUserStrikedPublishers={setUserStrikedPublishers} userWhitelistedPublishers={userWhitelistedPublishers} setUserWhitelistedPublishers={setUserWhitelistedPublishers} />
          <Update setArticles={setArticles} selectedTopics={selectedTopics} selectedPublishers={selectedPublishers} />
          <Feed articles={articles} />
        </main>
      </div>
    )
  } else {
    if (loginPage) {
      return (
        <div className="whole">
          <Header />
          <div class="subhead"></div>
          <div style={{display: "flex", flexDirection: "column", marginTop: "30px"}}>
            <div style={{display: 'flex', margin: "auto"}}>
              <div>
                <div style={{width: "80px"}}>Email</div><div><input type="text" /></div>
                <div style={{width: "80px", marginTop: '10px'}}>Password</div><div><input type="password" /></div>
                <button style={{marginTop: '10px'}} onClick={() => {
                  setLoginPage(false);
                  setLoggedIn(true);
                }}>Login</button>
              </div>
              <div style={{position: "relative", width: "50px", margin: "50px"}}>
                <div className="or">or</div>
              </div>
              <div style={{position: "relative", width: '147px'}}>
                <button className="signup" onClick={() => {
                  setLoginPage(false);
                  setInfoForm(true);
                }}>Sign up</button>
              </div>
            </div>
          </div>
        </div>
      )
    } else if (infoForm) {
      return (
        <div className="whole">
          <Header />
          <div class="subhead"></div>
          <div style={{display: "flex", flexDirection: "column", marginTop: "30px"}}>
            <div style={{display: 'flex', margin: "auto"}}>
              <div>
                <div style={{width: "80px"}}>Email</div><div><input type="text" /></div>
                <div style={{width: "80px", marginTop: '10px'}}>Create password</div><div><input type="password" /></div>
                <button style={{marginTop: '10px'}} onClick={() => {
                  setInfoForm(false);
                  setTopicsAndPublishersPage(true);
                }}>Continue</button>
              </div>
            </div>
          </div>
        </div>
      )
    } else if (topicsAndPublishersPage) {
      return (
        <div className="whole">
          <Header />
          <div class="subhead"></div>
          <div style={{display: "flex", flexDirection: "column", marginTop: "30px"}}>
            <div className="filter_list_heading">What interests you?</div>
            <TopicsList topics={topics} selectedTopics={selectedTopics} setSelectedTopics={setSelectedTopics} />
            <div className="filter_list_heading">Who do you want to hear from?</div>
            <PublishersList publishers={publishers} selectedPublishers={selectedPublishers} setSelectedPublishers={setSelectedPublishers} userStrikedPublishers={userStrikedPublishers} setUserStrikedPublishers={setUserStrikedPublishers} userWhitelistedPublishers={userWhitelistedPublishers} setUserWhitelistedPublishers={setUserWhitelistedPublishers} />
            <button onClick={() => {
              setTopicsAndPublishersPage(false);
              setLoggedIn(true);
            }} style={{margin: "auto"}}>Sign up</button>
          </div>
        </div>
      )

    }
  }
}

export default App;

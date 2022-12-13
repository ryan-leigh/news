import React from 'react';
import Axios from 'axios';
const {useState} = React;

const Update = ({setArticles, selectedPublishers, selectedTopics}) => {

  const [isError, setIsError] = useState(false);

  const handleClick = () => {
    Axios.get(`http://localhost:3000/articles?topics=${selectedTopics.map((topic) => topic.name).join(',')}&publishers=${selectedPublishers.join(',')}`)
      .then((response) => setArticles(response.data))
      .catch((err) => {
        console.log(err);
        setIsError(true)
      });
  }


  return (
    <div className="update_button_container">
      <div className="update_button_inner_container">
        <button onClick={handleClick}>Update Preferences</button>
      </div>

      {isError ? <div>There was an error retrieving the news</div> : null}
    </div>
  )
}

export default Update;
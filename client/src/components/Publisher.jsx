import React from 'react';
const {useState, useEffect} = React;

const Publisher = ({publisher, index, selectedPublishers, setSelectedPublishers, userStrikedPublishers, setUserStrikedPublishers, userWhitelistedPublishers, setUserWhitelistedPublishers}) => {

  const handleClick = (e) => {

    if (selectedPublishers.includes(publisher)) {

      // Update user-striked publishers list
      const newUserStrikedPublishers = userStrikedPublishers.slice();
      newUserStrikedPublishers.push(publisher);
      setUserStrikedPublishers(newUserStrikedPublishers);

      // Update selected publishers list
      const newSelectedPublishers = selectedPublishers.slice();
      newSelectedPublishers.splice(selectedPublishers.indexOf(publisher), 1);
      setSelectedPublishers(newSelectedPublishers);

    } else {

      // Update user-whitelisted publishers list
      const newUserWhitelistedPublishers = userWhitelistedPublishers.slice();
      newUserWhitelistedPublishers.push(publisher);
      setUserWhitelistedPublishers(newUserWhitelistedPublishers);

      // Update selected publishers list
      const newSelectedPublishers = selectedPublishers.slice()
      newSelectedPublishers.push(publisher);
      setSelectedPublishers(newSelectedPublishers);

    }

  }

  if (selectedPublishers.includes(publisher)) {
    return (
      <span className="list_item" id={`publisher${index}`} onClick={(e) => handleClick(e)} style={{textDecoration: 'underline', fontWeight: "bold"}}>
        {publisher}
      </span>
    )
  } else {
    return (
      <span className="list_item" id={`publisher${index}`} onClick={(e) => handleClick(e)} >
        {publisher}
      </span>
    )
  }
}

export default Publisher;

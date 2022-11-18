import React from 'react';
const {useState} = React;

const Publisher = ({publisher, index, selectedPublishers, setSelectedPublishers, userStrikedPublishers, setUserStrikedPublishers, userWhitelistedPublishers, setUserWhitelistedPublishers}) => {

  const [isSelected, setIsSelected] = useState(selectedPublishers.includes(publisher));

  const handleClick = (e) => {

    if (isSelected) {

      // Update user-striked publishers list
      const newUserStrikedPublishers = userStrikedPublishers.slice();
      newUserStrikedPublishers.push(publisher);
      setUserStrikedPublishers(newUserStrikedPublishers);

      // Update selected publishers list
      const newSelectedPublishers = selectedPublishers.slice();
      newSelectedPublishers.splice(selectedPublishers.indexOf(publisher), 1);
      setSelectedPublishers(newSelectedPublishers);

      // Unselect publisher
      setIsSelected(false);

    } else {

      // Update user-whitelisted publishers list
      const newUserWhitelistedPublishers = userWhitelistedPublishers.slice();
      newUserWhitelistedPublishers.push(publisher);
      setUserWhitelistedPublishers(newUserWhitelistedPublishers);

      // Update selected publishers list
      const newSelectedPublishers = selectedPublishers.slice().push(publisher);
      setSelectedPublishers(newSelectedPublishers);

      // Select publisher
      setIsSelected(true);

    }

  }

  if (isSelected) {
    return (
      <span className="list_item" id={`publisher${index}`} onClick={(e) => handleClick(e)}>
        {publisher.name}
      </span>
    )
  } else {
    return (
      <span className="list_item" id={`publisher${index}`} onClick={(e) => handleClick(e)} style={{textDecoration: 'line-through'}}>
        {publisher.name}
      </span>
    )
  }
}

export default Publisher;

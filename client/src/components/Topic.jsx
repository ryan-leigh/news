import React from 'react';

const Topic = ({topic, index, selectedTopics, setSelectedTopics}) => {

  const handleClick = (e) => {
    if (selectedTopics.includes(topic)) {
      const newSelectedTopics = selectedTopics.slice();
      newSelectedTopics.splice(newSelectedTopics.indexOf(topic), 1);
      setSelectedTopics(newSelectedTopics);
    } else {
      const newSelectedTopics = selectedTopics.slice();
      newSelectedTopics.push(topic);
      setSelectedTopics(newSelectedTopics);
    }
  }

  if (selectedTopics.includes(topic)) {
    return (
      <span className="list_item" id={`topic${index}`} onClick={handleClick}>
        {topic.name}
      </span>
    )
  } else {
    return (
      <span className="list_item" id={`topic${index}`} onClick={handleClick} style={{textDecoration: "line-through"}}>
        {topic.name}
      </span>
    )
  }
}

export default Topic;
import React from 'react';

const Topic = ({topic, index, selectedTopics, setSelectedTopics}) => {
  return (
    <span className="list_item" id={`topic${index}`}>
      {topic}
    </span>
  )
}

export default Topic;
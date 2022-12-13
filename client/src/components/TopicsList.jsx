import React from 'react';
import Topic from './Topic.jsx'

const TopicsList = ({topics, selectedTopics, setSelectedTopics}) => {
  return (
    <div className="filter_list">
      {topics.map((topic, index) => (
        <Topic key={index} topic={topic} index={index} selectedTopics={selectedTopics} setSelectedTopics={setSelectedTopics} />
      ))}
    </div>
  )
}

export default TopicsList;
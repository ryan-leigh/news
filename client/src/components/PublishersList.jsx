import React from 'react';
import Publisher from './Publisher.jsx'

const PublishersList = ({publishers, selectedPublishers, setSelectedPublishers, userStrikedPublishers, setUserStrikedPublishers, userWhitelistedPublishers, setUserWhitelistedPublishers}) => {
  return (
    <div className="filter_list">
      {publishers.map((publisher, index) => (
        <Publisher key={index} publisher={publisher} index={index} selectedPublishers={selectedPublishers} setSelectedPublishers={setSelectedPublishers} userStrikedPublishers={userStrikedPublishers} setUserStrikedPublishers={setUserStrikedPublishers} userWhitelistedPublishers={userWhitelistedPublishers} setUserWhitelistedPublishers={setUserWhitelistedPublishers} />
      ))}
    </div>
  )
}

export default PublishersList;
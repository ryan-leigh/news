import React from 'react';
import Article from './Article.jsx'

const {useState} = React;

const Feed = ({articles}) => {
  return (
    <div>
      {articles.map((article, index) => (
        <Article key={index} article={article} />
      ))}
    </div>
  )
}

export default Feed;
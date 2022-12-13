import React from 'react';

const Article = ({article}) => {

  const handleClick = () => {
    window.open(article.articleUrl, "_blank");
  }
  const handleCleanUrlClick = () => {
    window.open('http://' + article.publisher, "_blank");
  }

  return (
    <div className="article_container">
      <div className="article_row">
        <div style={{height: "200px", width: "200px"}}><img src={article.mediaUrl} className="article_thumbnail" onClick={handleClick} /></div>
        <div style={{display: 'flex', flexDirection: 'column', marginLeft: '20px'}}>
          <div className="article_title" onClick={handleClick}>{article.title} </div>
          <div style={{marginTop: '5px'}}>{article.author && !(article.author.toLowerCase() === article.publisher.toLowerCase()) ? `${article.author}, `: null} <span className="article_publisher" onClick={handleCleanUrlClick}>{article.publisher}</span></div>
          <div className="article_summary" style={{marginTop: '10px', fontSize: '15pt'}}>{article.summary}</div>
        </div>
      </div>
    </div>
  )
}

export default Article;
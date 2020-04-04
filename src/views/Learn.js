import React, { useEffect, useState } from 'react';
import {ViewContainer, ViewLayout } from './index';
import { Tabs } from '../components/Tabs';
import { LoadingListSkeleton } from '../components/Helpers';
import { ListItem } from '../components/List';


const News = () => {
  const [articles, setArticles] = useState(null);
  const [loadingResults, setLoadingResults] = useState(true);
  
  const API_KEY = "34dc6eb56a7c4869a6bc2004fc48ecc4";
  const url = `http://newsapi.org/v2/everything?q=vegan&language=en&sortBy=popularity&apiKey=${API_KEY}`;

  useEffect(() => {
    fetch(url)
    .then(response => response.json())    
    .then(data => setArticles(data.articles))
    .catch(err => console.error(err.message))
    .finally(() => setLoadingResults(false))
  }, [])

  if(loadingResults) {
    return <LoadingListSkeleton />    
  }

  return (
    <div>
      {articles.map(article => {
        const {title, url, urlToImage, source} = article;
        return(          
          <a href={url}>
            <ListItem 
          key={url} 
          image={urlToImage} 
          title={title} 
          subtitle={source.name}/>
          </a>
        )
      })}
    </div>
  )
}

const Learn = () => {
  return (
    <ViewContainer title={'Learn'}>
      <Tabs>
        <div label="Stats">
          <p>Stats</p>
        </div>
        <div label="News">
          <News />      
        </div>
      </Tabs>

    </ViewContainer>
  );
};

export default Learn;
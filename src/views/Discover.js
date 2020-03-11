import React, { useContext, useEffect } from 'react';
import ViewContainer from './index.js';
import { useData } from '../context/DataProvider';
import { AuthContext } from '../context/AuthProvider';
import { ListItem } from '../components/List';

const Discover = () => {
  return (
    <ViewContainer title={'Discover'}>
      <Suggestions />
    </ViewContainer>
  );
};

const SuggestionList = ({ data }) => {
  return data.map(item => {
    const { title, readyInMinutes, servings, id, image } = item;
    return (
      <ListItem image={`https://spoonacular.com/recipeImages/${image}`} title={title} subtitle={`${readyInMinutes} mins • ${servings} people`} path={`/meal/${id}`} />
    )
  })
}

const Suggestions = (props) => {
  const { suggested, getSuggested } = useData();

  // Fire action in Context
  useEffect(() => {
    const callGetSuggested = async () => {
      const data = await getSuggested();
      return data
    }
    callGetSuggested();
  }, []);

  return (
    <div>
      <p><strong>Suggested for today</strong></p>
      {suggested.length > 1 ? <SuggestionList data={suggested} /> : <div>Loading...</div>}
    </div>
  );
}

export default Discover;
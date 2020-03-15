import React, { useContext, useEffect, Suspense, useState } from 'react';
import {ViewContainer, ViewLayout} from './index.js';
import { useData } from '../context/DataProvider';
import { AuthContext } from '../context/AuthProvider';
import { ListItem } from '../components/List';
import { LoadingSpinner, LoadingListSkeleton } from '../components/Helpers';
import { SecondaryButton } from '../components/Buttons';

const Discover = () => {
  return (
    <ViewContainer title={'Discover'}>
      <Suspense fallback={<LoadingSpinner />}>
        <Suggestions />
      </Suspense>
    </ViewContainer>
  );
};

const SuggestionList = ({ data }) => {
  return data.map(item => {
    const { title, readyInMinutes, servings, id, image } = item;
    return (
      <ListItem key={id} image={`https://spoonacular.com/recipeImages/${image}`} title={title} subtitle={`${readyInMinutes} mins • ${servings} people`} path={`/meal/${id}`} />
    )
  })
}

const Suggestions = (props) => {
  const { suggested, getSuggested } = useData();
  const [suggestionLimit, setSuggestionLimit] = useState(8);

  // Fire action in Context
  useEffect(() => {
    const callGetSuggested = async () => {
      const data = await getSuggested(suggestionLimit);
      return data
    }
    callGetSuggested();
  }, [suggestionLimit]);

  return (
    <ViewLayout>
      <p><strong>Suggested for today</strong></p>
      {suggested.length > 1 ? <SuggestionList data={suggested} /> : <LoadingListSkeleton />}
      <SecondaryButton size={'large'} label={'Load More'} onClick={() => setSuggestionLimit(suggestionLimit + 4)} />
    </ViewLayout>
  );
}

export default Discover;
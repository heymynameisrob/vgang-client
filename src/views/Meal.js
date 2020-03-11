import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import ViewContainer from './index';

const Meal = () => {
  let { id } = useParams();
  return (
    <ViewContainer title={'Meal Name'} childView={true}>
      <h1>Meal: {id}</h1>
    </ViewContainer>
  );
};

export default Meal;
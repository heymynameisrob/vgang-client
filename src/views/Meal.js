import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useData } from '../context/DataProvider';
import ViewContainer from './index';
import { LoadingListSkeleton } from '../components/Helpers';
import styled from 'styled-components';

const MealHeader = (props) => {
  const { title, image, readyInMinutes, servings } = props.data;
  return (
    <StyledMealHeader style={{ backgroundImage: `url(${image})` }}>
      <StyledMealHeaderInner>
        <h1>{title}</h1>
        <p>{readyInMinutes} mins</p>
        <p>{servings} people</p>
      </StyledMealHeaderInner>
    </StyledMealHeader>
  )
}
const MealActions = () => {
  return <div>Actions</div>
}
const Meal = () => {
  const { fullRecipeInfo, getFullRecipeInfo } = useData();
  let { id } = useParams();

  useEffect(() => {
    getFullRecipeInfo(id);
  }, [])

  if (fullRecipeInfo.length == 0) {
    return <LoadingListSkeleton />
  }

  return (
    <ViewContainer title={fullRecipeInfo.title} childView={true}>
      <MealHeader data={fullRecipeInfo} />
      <MealActions />
    </ViewContainer>
  );
};

const StyledMealHeader = styled.header`
  position:relative;
  display:flex;
  justify-content:center;
  align-items:center;
  min-height:40vh;
  background-size:cover;
  margin:-2rem -1.5rem 0 -1.5rem;  

  &::after {
    content:'';
    position:absolute;
    top:0;
    left:0;
    width:100%;
    height:100%;
    background-color:rgba(0,0,0,0.6);
  }
`;
const StyledMealHeaderInner = styled.div`
  position:relative;
  z-index:2;
  display:block;
  text-align:center;
  color:#fff;
  padding:1.5rem;

  h1, p {
    color:#fff;
  }
`;

export default Meal;
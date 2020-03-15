import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useData, DataContext } from '../context/DataProvider';
import {ViewContainer, ViewLayout } from './index';
import { LoadingListSkeleton, convertToTitleCase } from '../components/Helpers';
import styled, {ThemeContext} from 'styled-components';
import { Tabs } from '../components/Tabs';
import { Heart, Share, Bookmark } from 'react-feather';

const IngredientList = ({data}) => {
  return(
    <ViewLayout>
      <StyledIngredientList>
        {data.map(item => {
          return(
            <li key={item.name}>
              <span>{Math.ceil(item.measures.metric.amount)} {item.measures.metric.unitShort}</span>
              <p>{convertToTitleCase(item.name)}</p>
            </li>
          )
        })}
      </StyledIngredientList>
    </ViewLayout>
  )
}

const RecipeInstructions = (props) => {
  const {id} = props;
  const { fullRecipeInstructions, getFullRecipeInstructions } = useData();

  useEffect(() => {
    getFullRecipeInstructions(id);
  }, [])    


  if (fullRecipeInstructions.length == 0) {
    return <LoadingListSkeleton />
  }  

  return fullRecipeInstructions[0].steps.map(item => {
    const {step,number} = item;
    return(
      <ViewLayout>
        <StyledInstructions key={number}>
          <span>{number}</span>
          <p>{step}</p>
        </StyledInstructions>
      </ViewLayout>
    )
  })
}

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
      <Tabs>
        <div label="Ingredients">                              
          <IngredientList data={fullRecipeInfo.extendedIngredients} />          
        </div>
        <div label="Method">
          <React.Suspense fallback={<LoadingListSkeleton />}>
            <RecipeInstructions id={id}/>
          </React.Suspense>
        </div>
      </Tabs>
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

const StyledIngredientList = styled.ul`
  display:block;

  li {
    display:flex;
    justify-content:flex-start;
    align-items:center;    
    list-style-type:none;
    padding:.5rem 0;

    span {
      flex:0 0 20%;
      font-size:0.85rem;
      color:${props => props.theme.colors.greyDark};      
    }
    p {
      flex:1;
      margin:0;
    }
  }
`
const StyledInstructions = styled.div`
  display:block;
  margin-bottom:1.5rem;

  span {
    display:block;
    font-size:3rem;
    opacity:0.25;    
  }  
`

const StyledActionWrap = styled.div`
  display:grid;
  grid-template-columns:repeat(3, 1fr);  
`

const StyledAction = styled.a`
  display:flex;
  justify-content:center;
  align-items:center;
  flex-flow:column nowrap;
  text-decoration:none;
  cursor:pointer;
  padding:1.5rem;
  text-align:center;

  p {
    margin-top:.5rem;
  }
`

export default Meal;
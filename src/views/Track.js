import React, {useContext, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {PrimaryButton} from '../components/Buttons';
import {ViewContainer, ViewLayout} from './index.js';
import { Tabs } from '../components/Tabs';
import {DataContext, useData} from '../context/DataProvider';
import { LoadingListSkeleton } from '../components/Helpers.js';
import { Trash } from 'react-feather';
import styled, { ThemeContext } from 'styled-components';



const Goals = (props) => {
  const data = useContext(DataContext);  
  const { goals, getGoals } = useData();    

  // Fire action in Context
  useEffect(() => {
    const callGetGoals = async () => {
      const data = await getGoals();
      return data
    }
    callGetGoals();
  }, []);

  if (goals.length == 0) {
    return <LoadingListSkeleton />
  }

  return (
    <StyledLayoutContainer>
      <ViewLayout noPad>      
        <GoalList list={goals} />      
      </ViewLayout>
      <ViewLayout>
        <Link to="/goal/add">
          <PrimaryButton label="Add new goal" size="large" />
        </Link>
      </ViewLayout>
    </StyledLayoutContainer>
  )
}

const GoalList = ({list}) => {
  const theme = useContext(ThemeContext);
  const data = useContext(DataContext);    

  return list.map(item => {
    const {name, date, key} = item.data;
      return(        
        <StyledList key={item.id}>
          <Link to={`/goal/view/${key}`}>
            <StyledListInner>
              <p>{name}</p>
              <p>{date} • 95% complete</p>
              <progress value="95" max="100" />
            </StyledListInner>        
          </Link>
          <StyledAction onClick={() => {data.removeGoal(item.id)}}>
            <Trash color={theme.colors.greyDark} /> 
          </StyledAction> 
        </StyledList>        
      )      
    });
}

const Journey = (props) => {
  return (
    <ViewLayout>
      <p>Journey</p>
    </ViewLayout>
  )
}

const Track = () => {
  return (
    <ViewContainer title={'Track'}>
      <Tabs>
        <div label="Goals">
          <Goals />
        </div>
        <div label="Journey">
          <React.Suspense fallback={<LoadingListSkeleton />}>
            <Journey />
          </React.Suspense>
        </div>
      </Tabs>    
    </ViewContainer>
  );
}

const StyledLayoutContainer = styled.div`
  display:flex;
  justify-content:center;
  align-items:center;
  flex-flow:column nowrap;
  min-height:calc(100vh - (56px + 64px));

  section {
    width:100%;
  }
  section:last-of-type {
    margin-top:auto;
  }
`

const StyledList = styled.div`
  display:flex;
  justify-content:flex-start;
  align-items:center;
  flex-flow:row nowrap;
  padding:1rem 1.5rem;

  svg {
    opacity:0;
    transition:all .25s ease;
  }

  &:hover svg {
    opacity:1;
    transition:all .25s ease;
  }

  a:first-of-type {
    flex:1;
  }

  &:hover {
    background-color:#F2F1EF;
  }
`;
const StyledListInner = styled.div`
  display:block;
  width:80%; 

  p:last-of-type {
    font-size:0.75rem;
    color:${props => props.theme.colors.textSecondary};
  }

  progress {
    display:block;
    -webkit-appearance: none;
    appearance: none;
    width:100%;
    height:8px;
    border-radius:2rem;    
    margin-top:.5rem;
  }
  progress[value]::-webkit-progress-bar {
    border-radius:2rem;   
  }
  progress[value]::-webkit-progress-value,
  progress[value]::-moz-progress-bar  {
    background:${props => props.theme.colors.peach};
    border-radius:2rem;    
  }
`;
const StyledAction = styled.a`
  display:block;
  cursor:pointer; 
  padding-left: 1.5rem; 
`;


export default Track;
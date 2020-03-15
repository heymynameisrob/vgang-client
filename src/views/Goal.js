import React, { useState, useContext } from 'react'
import {useParams} from 'react-router-dom';
import { ViewContainer, ViewLayoutCenter, ViewLayout } from '.';
import { PrimaryButton } from '../components/Buttons';
import styled, {ThemeContext} from 'styled-components';
import { List, Calendar } from 'react-feather';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { DataContext } from '../context/DataProvider';

export const GoalDetail = () => {
  let { id } = useParams();
  return (
    <ViewContainer title="Goal" childView={true}>    
      <p>Goal Detail: {id}</p>
    </ViewContainer>
  )
}

const AddGoalForm = (props) => {  
  const theme = useContext(ThemeContext);
  const data = useContext(DataContext);    
  const [formData, setFormData] = useState();  
  const [selected, setSelected] = useState(props.type.type);
  const dataTypes = [ {value:'meatFree', label:'Go Meat Free'}, {value:'noRedMeat', label:'Cut down on red meat'}, {value:'noDairy', label:'Cut out dairy'}, {value:'custom', label:'Custom'}]

  return(
    <ViewLayout>
      <StyledForm>
        <p>I want to</p>
        <input type="text" onBlur={(e) => { setFormData({...formData, name: e.target.value})}} placeholder="Goal name" />
        <StyledFormOption>
          <Calendar color={theme.colors.greyDark} />
          <input type="date" onChange={(e) => { setFormData({...formData, date:e.target.value})}} />
        </StyledFormOption>
        <StyledFormOption>
          <List color={theme.colors.greyDark} />
          <Dropdown options={dataTypes} value={selected} onChange={(e) => { setSelected(e.value); setFormData({...formData, type:e.value }) } } />
        </StyledFormOption>
      </StyledForm>
      <PrimaryButton label="Add goal" size="large" onClick={() => data.addGoal(formData)} />
    </ViewLayout>
  )
}

const AddGoalOptions = (props) => {
  const {handleSelected} = props;
  return(
    <ViewLayoutCenter>  
      <p className="body-lg">Choose a goal or create your own</p>
      <MultiOptionButton data-value="meatFree" onClick={handleSelected}>🐽 Go meat-free this month</MultiOptionButton>
      <MultiOptionButton data-value="noRedMeat" onClick={handleSelected}>🔴 Cut out red meat</MultiOptionButton>
      <MultiOptionButton data-value="noDairy" onClick={handleSelected}>🐮 Cut down on dairy</MultiOptionButton>
      <MultiOptionButton data-value="custom" onClick={handleSelected}>✍️ Something else</MultiOptionButton>
    </ViewLayoutCenter>  
  )
}

export const AddGoal = () => {
  const [selectedType,setSelectedType] = useState('custom');
  return (
    <ViewContainer title="Add Goal" childView={true}>      
      {selectedType.length > 1 ? <AddGoalForm type={{type: selectedType}}/> : <AddGoalOptions handleSelected={(e) => {setSelectedType(e.target.dataset.value)}} />}
    </ViewContainer>
  )
}

const StyledForm = styled.form`
  display:grid;
  grid-template-columns:1fr 1fr;
  grid-gap:1rem;

  input[type="text"],
  input[type="date"],
  .Dropdown-control {
    position:relative; 
    display:block;   
    width:100%;
    padding:1rem 1.5rem;
    font-size:1rem;
    line-height:1;
    font-family:'Inter';
    border-radius:4rem;
    background-color:#fff;
    border:1px solid ${props => props.theme.colors.grey};    
  }  
  input[type="text"] {
    grid-column:span 2;
  }
  .Dropdown-control,
  input[type="date"]{
    padding-left:3rem;
  }
  .Dropdown-arrow {
    top:1.5rem;
    right:1rem;
  }
  .Dropdown-option.is-selected,
  .Dropdown-option:hover {
    background-color:${props => props.theme.colors.peachLight}
  }
`;
const StyledFormOption = styled.div`
  position:relative;
  display:block;

  svg {
    position:absolute;
    top:.8rem;
    left:1rem;
    z-index:1;
  }
`;

const MultiOptionButton = styled.button`
  display:block;
  width:100%;
  border:none;
  font-size:1.125rem;
  padding:0.75rem 1.5rem;
  border-radius:4rem;
  box-shadow:0 2px 4px rgba(0,0,0,0.08);
  text-align:center;
  background-color:#fff;  
  margin:1rem auto 0 auto;
  cursor:pointer;

  &:hover {
    background-color:#f5f5f5;
  }
`
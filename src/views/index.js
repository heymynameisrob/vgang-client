import React, { Children } from 'react';
import { ViewHeader } from '../components/Header';
import styled from 'styled-components';

export const ViewLayout = (props) => {
  return <StyledLayout {...props} >{props.children}</StyledLayout>
}

export const ViewLayoutCenter = (props) => {
  return <StyledLayoutCenter {...props} >{props.children}</StyledLayoutCenter>
}

export const ViewContainer = (props) => {
  const { children, title, ...rest } = props;
  return (
    <StyledContainer>
      <ViewHeader {...rest}>
        {title}
      </ViewHeader>   
      {children} 
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  display:grid;
  grid-template-rows:64px auto;
  height:100%;
`

const StyledLayout = styled.section`
  display:flex;
  justify-content:flex-start;  
  flex-flow:column nowrap;
  padding:${props => props.noPad ? '0' : '2rem 1.5rem 4rem 1.5rem;'};
  max-width:32rem;
  margin:0 auto;
  width:100%;

  button {
    margin-top:auto;
  }

  @media(min-width:56rem) {
    padding:1.5rem 0 6rem;
  }
`

const StyledLayoutCenter = styled.section`
  display:flex;
  justify-content:center;
  align-items:center;
  flex-flow:column nowrap;
  padding:${props => props.noPad ? '0' : '2rem 1.5rem 4rem 1.5rem;'};
  max-width:32rem;
  margin:0 auto;
  width:100%;

  @media(min-width:56rem) {
    padding:1.5rem 0 6rem;
  }
`
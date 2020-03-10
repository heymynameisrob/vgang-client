import React, { Children } from 'react';
import { ViewHeader } from '../components/Header';
import styled from 'styled-components';

const ViewContainer = (props) => {
  const { children, title } = props;
  return (
    <StyledViewContainer>
      <ViewHeader>
        {title}
      </ViewHeader>
      {children}
    </StyledViewContainer>
  );
};

const StyledViewContainer = styled.div`
  display:block;
  margin-top:67px;
  padding:2rem 0;
`

export default ViewContainer;
import React, { Children } from 'react';
import { ViewHeader } from '../components/Header';
import styled from 'styled-components';

const ViewContainer = (props) => {
  const { children, title, childView } = props;
  return (
    <StyledViewContainer>
      <ViewHeader childView={childView}>
        {title}
      </ViewHeader>
      {children}
    </StyledViewContainer>
  );
};

const StyledViewContainer = styled.div`
  display:block;
  margin-top:67px;
  padding:2rem 1.5rem 6rem;
`

export default ViewContainer;
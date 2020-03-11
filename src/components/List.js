import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const ListItemInner = (props) => {
  const { image, title, subtitle } = props;
  return (
    <StyledListItem>
      {image && <StyledListImage><img src={image} alt={title} loading="lazy" /></StyledListImage>}
      <StyledListItemCopy>
        <h4>{title}</h4>
        <p>{subtitle}</p>
      </StyledListItemCopy>
    </StyledListItem>
  );
};

export const ListItem = (props) => {
  const { path } = props;
  return path ? <Link to={path} style={{ textDecoration: 'none' }}><ListItemInner {...props} /></Link> : <ListItemInner {...props} />
}

const StyledListItem = styled.div`
  display:flex;
  justify-content:flex-start;
  align-items:center;
  flex-flow:row nowrap;
  padding:1rem 0;

  &:hover {
    background-color:#F2F1EF;
  }
`;
const StyledListImage = styled.div`
  display:block;
  width:4rem;  
  height:4rem;
  background-color:#f5f5f5;
  overflow:hidden;

  img {
    border-radius:0.25rem;
    object-fit:cover;
    width:100%;
    height:100%;
  }
`;
const StyledListItemCopy = styled.div`
  display:block;
  padding-left:1rem;
  flex:1;
  padding-right:1.5rem;
`;



import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const PrimaryButton = (props) => {
  const { size, label } = props;
  return (
    <StyledPrimaryButton size={size} {...props}>
      {label || 'Button'}
    </StyledPrimaryButton>
  )
};

export const SecondaryButton = (props) => {
  const { path, size, label } = props;
  return (
    <StyledSecondaryButton size={size} {...props}>
      {label || 'Button'}
    </StyledSecondaryButton>
  )
};

const StyledPrimaryButton = styled.button`
  display:${props => props.size === 'large' ? 'block' : 'inline-block'};
  width:${props => props.size === 'large' ? '100%' : 'auto'};
  padding: ${props => props.size === 'large' ? '1rem 2rem' : '0.75 1.5rem'};
  font-size: ${props => props.size === 'large' ? '1.125rem' : '1rem'};
  color:#fff;
  font-weight:600;
  border-radius:4rem;
  text-decoration:none;
  margin:1.5rem auto;
  text-align:center;
  cursor:pointer;
  outline:0;
  border:1px solid ${props => props.theme.colors.pear};
  background-color: ${props => props.theme.colors.pear};
  box-shadow:0 2px 8px rgba(45, 134, 76, 0.08);  
  opacity:1;
  transform:translate3d(0,0,0);
  transition: all .25s ease;

  &:hover {    
    opacity:0.8;
    transform:translate3d(0,-5%,0);    
    transition: all .25s ease;
  }
`

const StyledSecondaryButton = styled.button`
  display:${props => props.size === 'large' ? 'block' : 'inline-block'};
  width:${props => props.size === 'large' ? '100%' : 'auto'};
  padding: ${props => props.size === 'large' ? '1rem 2rem' : '0.75 1.5rem'};
  font-size: ${props => props.size === 'large' ? '1.125rem' : '1rem'};
  color:${props => props.theme.colors.pear};
  font-weight:600;
  border-radius:4rem;
  margin:1.5rem auto;
  text-align:center;
  text-decoration:none;
  cursor:pointer;
  outline:0;
  border:2px solid ${props => props.theme.colors.pear};
  background-color: transparent;  
  opacity:1;
  transform:translate3d(0,0,0);
  transition: all .25s ease;

  &:hover {    
    opacity:0.8;
    transform:translate3d(0,-5%,0);    
    transition: all .25s ease;
  }
`

export default PrimaryButton;
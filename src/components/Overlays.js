import React, {useState} from 'react';
import styled from 'styled-components';

export const Modal = (props) => {
  return (
    <StyledModalWrap {...props}>
      <StyledModal>
        {props.children}
      </StyledModal>
    </StyledModalWrap>
  )
}

const StyledModalWrap = styled.div`
  position:fixed;
  top:0;
  left:0;
  width:100%;
  height:100%;
  z-index:998;
  display:flex;
  justify-content:center;
  align-items:center;
  flex-flow:column nowrap;
  padding:1.5rem;
  background-color:rgba(0,0,0,0.7);
  opacity:${props => props.isOpen === true ? 1 : 0};
  pointer-events:${props => props.isOpen === true ? 'auto' : 'none'}; 
  transition:all .25s ease;
`;
const StyledModal = styled.div`
  display:flex;
  justify-content:center;
  align-items:center;
  flex-flow:column nowrap;
  padding:4rem 1.5rem;
  text-align:center;
  border-radius:1rem;
  background-color:${props => props.theme.colors.greyLight};
  box-shadow:0 0 100px rgba(0,0,0,0.08);
  width:100%;
  max-width:32rem;
  margin:0 auto;
`
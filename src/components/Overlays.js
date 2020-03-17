import React, {useState, useEffect} from 'react';
import styled from 'styled-components';

export const Modal = (props) => {
  const {isOpen, onCloseRequest} = props
  useEffect(() => {
    if(isOpen) {
      document.body.style = 'position:fixed;top:0;left:0;overflow:hidden;width:100%;'
    } else {
      document.body.style = ''
    }    
  }, [isOpen]);
  return (
    <StyledModalWrap isOpen={isOpen}>
      <StyledModalBacker onClick={onCloseRequest} />
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
const StyledModalBacker = styled.div`
  position:fixed;
  top:0;
  left:0;
  width:100%;
  height:100%;
  z-index:0;
`
const StyledModal = styled.div`
  position:relative;
  display:block;
  padding:3rem 1.5rem;
  text-align:center;
  border-radius:1rem;
  background-color:${props => props.theme.colors.greyLight};
  box-shadow:0 0 100px rgba(0,0,0,0.08);
  z-index:1;
  width:100%;
  max-width:32rem;
  margin:0 auto;
  max-height:80%;
  overflow-y:auto;  
`
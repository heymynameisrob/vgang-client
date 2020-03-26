import React, { useContext } from 'react';
import ViewContainer from './index';
import { AuthContext } from '../context/AuthProvider';
import { GoogleButton } from '../components/Buttons';
import styled from 'styled-components';
import FruitVeg from '../static/Fruit-Veg.svg';
import SVG from 'react-inlinesvg';

const LogInButton = () => {
  return (
    <StyledButtonWrap>
      <AuthContext.Consumer>
        {({ login }) => (
          <GoogleButton onClick={login} />                
        )}
      </AuthContext.Consumer>
    </StyledButtonWrap>
  )
}

const LogIn = () => {
  return (
    <StyledViewContainer>
      <StyledSplashTitle>        
        <h2>Vgang.club</h2>
        <p>Track your diet, discover great recipes & learn more about the vegan lifestyle.</p>
      </StyledSplashTitle>
      <StyledSVGWrap>
        <SVG src={FruitVeg} />
      </StyledSVGWrap>
      <LogInButton />
    </StyledViewContainer>    
  )
};

const StyledViewContainer = styled.div`
  display:flex;
  justify-content:center;
  align-items:center;
  flex-flow:column nowrap;
  padding:2rem 0;
  max-width:56rem;
  margin:0 auto;
  height:100%;    
  
  button {
    margin-top:auto;
  }
`
const StyledSplashTitle = styled.div`
  display:block;
  text-align:center;  
  padding:0 1.5rem 2rem 1.5rem;

  img {
    border-radius:50%;
    margin:0 auto;
    margin-bottom:1.5rem;
  }
  p {
    max-width:45ch;
    margin:0 auto;
  }
`

const StyledSVGWrap = styled.div`
  display:flex;
  justify-content:center;
  width:100%;
  overflow:hidden;
  margin-bottom:auto;

  svg {
    width:100%;
    max-width:none;
    min-width:480px;
  }
`

const StyledButtonWrap = styled.div`
  padding:2rem 1.5rem 0 1.5rem;
  width:100%;
`

export default LogIn;

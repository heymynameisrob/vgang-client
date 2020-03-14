import React, { useContext } from 'react';
import ViewContainer from './index';
import { AuthContext } from '../context/AuthProvider';
import { GoogleButton } from '../components/Buttons';
import styled from 'styled-components';

const LogInButton = () => {
  return (
    <AuthContext.Consumer>
      {({ login }) => (
        <GoogleButton onClick={login} />                
      )}
    </AuthContext.Consumer>
  )
}

const LogIn = () => {
  return (
    <StyledViewContainer>
      <StyledSplash>
        <img src="https://placehold.it/200x200" />
        <h1>Vgang.club</h1>
        <p>Track, discover & learn all about a meat-free lifestyle. Welcome to the club.</p>
      </StyledSplash>
      <LogInButton />
    </StyledViewContainer>    
  )
};

const StyledViewContainer = styled.div`
  display:flex;
  justify-content:center;
  align-items:center;
  flex-flow:column nowrap;
  padding:2rem 1.5rem 2rem;
  max-width:56rem;
  margin:0 auto;
  min-height:100vh;
  
  button {
    margin-top:auto;
  }
`
const StyledSplash = styled.div`
  display:block;
  text-align:center;
  margin-top:auto;

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

export default LogIn;

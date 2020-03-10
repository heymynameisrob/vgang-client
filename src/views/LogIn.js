import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthProvider';
import styled from 'styled-components';

const LogInButton = () => {
  return (
    <AuthContext.Consumer>
      {({ login }) => (
        <StyledLogInButton onClick={login} >
          login
        </StyledLogInButton>
      )}
    </AuthContext.Consumer>
  )
}

const LogIn = () => {
  return (
    <LogInButton />
  )
};

const StyledLogInButton = styled.button`
  display:block;
  width:100%;
  background-color:#fff;
  box-shadow:0 0 8px rgba(0,0,0,0.1);
  border-radius:5rem;
  text-align:center;
  cursor:pointer;
  border:0;
`


export default LogIn;

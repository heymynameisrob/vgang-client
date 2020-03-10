import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';
import styled, { ThemeContext } from 'styled-components';

export const ViewHeader = (props) => {
  const { children } = props;
  return (
    <StyledViewHeader role="banner">
      <h4>{children}</h4>
      <ProfileAvatar />
    </StyledViewHeader>
  );
};

const ProfileAvatar = () => {
  const user = useContext(AuthContext);
  const theme = useContext(ThemeContext);
  const { displayName, photoURL } = user.userInfo;

  return (
    <StyledAvatarWrap>
      <Link to="/profile">
        <img src={photoURL} alt={displayName} />
      </Link>
    </StyledAvatarWrap>
  )
}

const StyledViewHeader = styled.header`
  position:absolute;
  top:0;
  left:0;
  width:100%;  
  z-index:2;
  padding:1.5rem 1rem;
  margin:0;
  text-align:center;
  display:flex;
  justify-content:flex-start;
  align-items:stretch;
  flex-flow:row nowrap;
  box-shadow:0 0 16px rgba(0,0,0,0.08);

  h4 {
    margin:0 auto;   
  }
`

const StyledAvatarWrap = styled.div`
  position:absolute;
  top:.75rem;
  right:1rem;    

  a {
    display:block;
  }
  
  img {
    display:block;
    width:2.5rem;
    border-radius:50%;  
    box-shadow:0 2px 4px rgba(0,0,0,0.08);
  }
`

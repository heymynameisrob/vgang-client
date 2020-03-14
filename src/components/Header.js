import React, { useContext } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';
import styled, { ThemeContext } from 'styled-components';
import { ArrowLeft } from 'react-feather';

export const Header = (props) => {
  const { children, history, childView } = props;
  const theme = useContext(ThemeContext);
  return (
    <StyledViewHeader role="banner">
      {childView && <a style={{cursor:'pointer' }} onClick={history.goBack}><ArrowLeft color={theme.colors.greyDark} /></a>}
      <h4>{children}</h4>
      {!childView && <ProfileAvatar />}
    </StyledViewHeader>
  );
};

export const ViewHeader = withRouter(Header);

// Get initials from first name
const getInitials = (string) => {
  var names = string.split(' '),
    initials = names[0].substring(0, 1).toUpperCase();

  if (names.length > 1) {
    initials += names[names.length - 1].substring(0, 1).toUpperCase();
  }
  return initials;
};

const ProfileAvatar = () => {
  const user = useContext(AuthContext);
  const theme = useContext(ThemeContext);
  const { displayName, photoURL } = user.userInfo;
  let checkForAvatar = photoURL.length > 0 && true;

  return (
    <StyledAvatarWrap>
      <Link to="/profile">
        <StyledAvatar style={{ backgroundImage: `url(${checkForAvatar && photoURL})` }}>
          {!checkForAvatar && getInitials(displayName)}
        </StyledAvatar>
      </Link>
    </StyledAvatarWrap>
  )
}

const StyledViewHeader = styled.header`
  position:absolute;
  top:0;
  left:0;
  display:grid;
  grid-template-columns:minmax(40px, auto) 1fr minmax(40px, auto);
  width:100%;  
  z-index:98;  
  margin:0;
  text-align:center;  
  padding:0 1.5rem;
  height:64px;
  box-shadow:0 0 16px rgba(0,0,0,0.08);

  h4 {
    grid-column:2;
    margin:0 auto;
    text-align:center;  
    align-self:center;   
    overflow:hidden;
    white-space:nowrap;
    text-overflow:ellipsis;
    max-width:80%;    
  }
  a {    
    margin:0;    
    align-self:center; 
  }
  a svg {
    display:block;
  }
`

const StyledAvatarWrap = styled.div`
  display:block;  
  align-self:center;

  a {
    text-decoration:none;
  }
`
const StyledAvatar = styled.div`
  display:flex;
  justify-content:center;
  align-items:center;
  background-size:cover;
  width:2.5rem;
  height:2.5rem;
  border-radius:50%;  
  background-color:${props => props.theme.colors.pear};
  color:#fff;  
  font-weight:600;
  box-shadow:0 2px 4px rgba(0,0,0,0.08);
`
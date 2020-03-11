import React, { Children, useContext } from 'react';
import { AuthContext } from '../context/AuthProvider';
import styled from 'styled-components';
import ViewContainer from './index';


const ProfileInfo = () => {
  const user = useContext(AuthContext);
  const { displayName, photoURL, email } = user.userInfo;
  return (
    <StyledProfileInfo>
      <StyledProfileInfoAvatar src={photoURL} />
      <h3>{displayName}</h3>
      <p className="body-lg">{email}</p>
    </StyledProfileInfo>
  )
}

const Profile = () => {
  return (
    <ViewContainer title={'Profile'} childView={true}>
      <ProfileInfo />
      <StyledList>
        <a href="#">Privacy Policy</a>
        <a href="#">App Info</a>
        <AuthContext.Consumer>
          {({ logout }) => (
            <a href="#" onClick={logout} >
              Logout
            </a>
          )}
        </AuthContext.Consumer>
      </StyledList>
    </ViewContainer>
  );
};

const StyledList = styled.div`
  margin:0;
  padding:0;
  text-align:center;

  a {
    display:block;
    padding:1rem 0;
    color:${props => props.theme.colors.textPrimary}
  }
  a:last-of-type {
    color:#D51717;
    font-weight:600;
  }
`

const StyledProfileInfo = styled.div`
  display:block;
  padding:1.5rem 0;
  text-align:center;
`
const StyledProfileInfoAvatar = styled.img`
  border-radius:50%;
  max-width:8rem;
  margin:0 auto 1.5rem auto;
`

export default Profile;
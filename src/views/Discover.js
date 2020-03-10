import React, { useContext } from 'react';
import ViewContainer from './index.js';
import { AuthContext } from '../context/AuthProvider';

const Discover = () => {
  return (
    <ViewContainer title={'Discover'}>
      <AuthContext.Consumer>
        {({ logout }) => (
          <a href="#" onClick={logout} >
            Logout
          </a>
        )}
      </AuthContext.Consumer>
    </ViewContainer>
  );
};

export default Discover;
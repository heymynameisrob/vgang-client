import React from 'react';
import { BrowserRouter as Router, Route, withRouter } from "react-router-dom";
import styled from 'styled-components';

import Navbar from './components/Navbar';
import Discover from './views/Discover';
import Track from './views/Track';
import Learn from './views/Learn';
import LogIn from './views/LogIn';
import Profile from './views/Profile';
import Meal from './views/Meal';

const RouterNav = withRouter(Navbar);

const createRoutes = (props) => {
  return (
    <StyledView>
      <Router>
        <RouterNav />
        <Route exact path="/" component={Discover} />
        <Route exact path="/track" component={Track} />
        <Route exact path="/learn" component={Learn} />
        <Route exact path="/login" component={LogIn} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/meal/:id" component={Meal} />
      </Router>
    </StyledView>
  )
}

const StyledView = styled.div`
  display:block;
  max-width:768px;
  margin:0 auto;
`

export default createRoutes;
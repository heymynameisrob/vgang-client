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
import { GoalDetail, AddGoal } from './views/Goal';

const RouterNav = withRouter(Navbar);

const createRoutes = (props) => {
  return (    
    <Router>
      <RouterNav />
      <Route exact path="/" component={Discover} />
      <Route exact path="/track" component={Track} />
      <Route exact path="/learn" component={Learn} />
      <Route exact path="/login" component={LogIn} />
      <Route exact path="/profile" component={Profile} />
      <Route exact path="/meal/:id" component={Meal} />
      <Route exact path="/goal/view/:id" component={GoalDetail} />
      <Route exact path="/goal/add" component={AddGoal} />
    </Router>    
  )
}

export default createRoutes;
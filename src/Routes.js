import React from 'react';
import { BrowserRouter as Router, Route, withRouter } from "react-router-dom";
import styled from 'styled-components';

import Navbar from './components/Navbar';
import { LoadingSpinner } from './components/Helpers';

// Code Split
const Discover = React.lazy(() => import('./views/Discover'));
const Learn = React.lazy(() => import('./views/Learn'));
const LogIn = React.lazy(() => import('./views/LogIn'));
const Profile = React.lazy(() => import('./views/Profile'));
const Meal = React.lazy(() => import('./views/Meal'));
const Challenge = React.lazy(() => import('./views/Challenge'));
const ChallengeDetail = React.lazy(
  () => import('./views/Challenge').then(module => ({ default: module.ChallengeDetail }))
)
const ChallengeComplete = React.lazy(
  () => import('./views/Challenge').then(module => ({ default: module.ChallengeComplete }))
)


const RouterNav = withRouter(Navbar);

const createRoutes = (props) => {
  return (    
    <Router>
      <RouterNav />
      <React.Suspense fallback={<LoadingSpinner fixed={true} size={'large'}/>}>
        <Route exact path="/" component={Discover} />      
        <Route exact path="/learn" component={Learn} />
        <Route exact path="/login" component={LogIn} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/meal/:id" component={Meal} />      
        <Route exact path="/challenge" component={Challenge} />      
        <Route exact path="/challenge/details/:id" component={ChallengeDetail} />      
        <Route exact path="/challenge/complete" component={ChallengeComplete} />      
      </React.Suspense>
    </Router>    
  )
}

export default createRoutes;
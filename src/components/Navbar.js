import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Activity, BookOpen, Search, ArrowLeft } from 'react-feather';
import { ThemeContext } from 'styled-components';
import styled from 'styled-components';

const navbarLinks = [
  {
    id: 'discover',
    path: '/',
  },
  {
    id: 'track',
    path: '/track',
  },
  {
    id: 'learn',
    path: '/learn',
  }
];

const ParentNav = (props) => {
  const theme = useContext(ThemeContext);
  const { pathname } = props.location;
  const find = navbarLinks.find(el => {
    return el.path === pathname
  });
  const [tabActive, setTabActive] = useState(find.id);
  const themedIcons = { discover: Search, track: Activity, learn: BookOpen }

  return (
    <nav role="navigation">
      <StyledTabWrap>
        {navbarLinks.map(link => {
          const { id, path } = link;
          const Icon = themedIcons[id] || 'discovery';
          return (
            <Link key={id} to={path}>
              <StyledTab
                active={tabActive.includes(id)}
                onClick={() => { setTabActive(id) }}>
                <Icon color={tabActive.includes(id) ? theme.colors.pear : theme.colors.grey} />
              </StyledTab>
            </Link>
          )
        })}
      </StyledTabWrap>
    </nav>
  );
};

const Navbar = (props) => {
  const { match, location, history } = props;
  return navbarLinks.find(o => o.path === location.pathname) !== undefined ? <ParentNav {...props} /> : null;
}

const StyledTab = styled.div`
  display:flex; 
  width:100%;
  background-color:white;  
  justify-content:center;
  align-items:center;
  flex-flow:column nowrap; 
  height:100%;
  border:0;
  outline:0;    
  font-size:16px;  
`

const StyledTabWrap = styled.div`
  position:fixed;
  bottom:0;
  left:0;
  width:100%;
  height:56px;
  z-index:2;
  padding:0;
  margin:0;
  display:flex;
  justify-content:flex-start;
  align-items:stretch;
  flex-flow:row nowrap;
  box-shadow:0 0 16px rgba(0,0,0,0.08);

  a {
    flex:1;
    display:block;    
  }
`;

export default Navbar;
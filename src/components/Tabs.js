import React, {useState} from 'react'
import styled from 'styled-components';
import { LoadingListSkeleton } from './Helpers';

export const Tabs = ({children}) => {  
  const [activeTab, setActiveTab] = useState(children[0].props.label);  
  return (
    <StyledTabContainer>
      <StyledTabHeader>
      {children.map((child) => {
        const { label } = child.props;
        return (
          <Tab
            activeTab={activeTab}
            key={label}
            label={label}
            onClick={() => setActiveTab(label)}
          />
        );
      })}
      </StyledTabHeader>
      <StyledTabContent>
        {children.map((child) => {
          if (child.props.label !== activeTab) return undefined;
          return child.props.children;
        })}
      </StyledTabContent>
    </StyledTabContainer>
  )
}

export const Tab = (props) => {
  const {activeTab, label} = props;  
  return (
    <StyledTab className={activeTab === label ? 'is-active' : null} {...props}>      
      {label}
    </StyledTab>
  )
}

const StyledTabContainer = styled.div`
  display:block;
  margin-left:-1.5rem;
  margin-right:-1.5rem;
`;
const StyledTabHeader = styled.ol`
  display:flex;
  justify-content:space-between;
  padding:.5rem 1rem;
  background-color:${props => props.theme.colors.grey};
  color:white;
`;
const StyledTabContent = styled.div`
  padding:2rem 1.5rem;
`;
const StyledTab = styled.li`
  flex:1;
  display:block;
  list-style-type:none;
  text-align:center;
  padding:.5rem 1rem;
  cursor:pointer;
  color:${props => props.theme.colors.textSecondary};

  &.is-active {
    background-color:#fff;
    box-shadow:0 2px 4px rgab(0,0,0,0.2);
    color:${props => props.theme.colors.textPrimary};
    border-radius:4rem;
  }
`;




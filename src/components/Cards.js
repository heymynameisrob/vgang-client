import React, { useContext } from 'react'
import styled, { ThemeContext } from 'styled-components'
import { Clock, Repeat } from 'react-feather';
import {readableColor} from './Helpers';

export const ChallengeCard = (props) => {
  const theme = useContext(ThemeContext);
  const {baseColor, title, desc, time, repeats, emoji, ...rest} = props;
  return (
    <StyledCardFrame {...rest} base={baseColor || '#fff'} lead={baseColor ? readableColor(baseColor) : 'rgba(0,0,0,0.9)'}> 
      <h4>{title}</h4>
      <p>{desc}</p>
      <StyledCardAttrWrap>
        <StyledCardAttr>
          <Clock color={baseColor ? readableColor(baseColor) : 'rgba(0,0,0,0.9)'} />
          <p>{time} days</p>
        </StyledCardAttr>
        {repeats > 1 ? <StyledCardAttr><Repeat color={baseColor ? readableColor(baseColor) : 'rgba(0,0,0,0.9)'} /><p>{repeats}</p></StyledCardAttr> : null}
      </StyledCardAttrWrap>
      <span className="emoji">{emoji}</span>
    </StyledCardFrame>
  )
}

const StyledCardFrame = styled.div`
  position:relative;
  display:block;
  padding:1rem;
  border-radius:.5rem;
  box-shadow:0 0.25rem 1rem rgba(0,0,0,0.08);
  background-color:${props => props.base || props.theme.colors.pear};
  margin-bottom:1.5rem;
  text-align:left;
  overflow:hidden;

  h4 {
    color:${props => props.lead};
  }
  p {
    color:${props => props.lead};
    opacity:0.7;
    max-width:30ch;
  }  
  .emoji {
    position:absolute;
    bottom:0;
    right:0;
    font-size:80px;
    line-height:1;
  }
`;
const StyledCardAttrWrap = styled.ul`
  margin:1rem 0 0 0;
  padding:0;
  display:flex;
  justify-content:flex-start;
  align-items:center;
  flex-flow:row nowrap;
`;
const StyledCardAttr = styled.li`
  display:flex;
  justify-content:flex-start;
  align-items:center;
  flex-flow:row nowrap;
  padding-right:2rem;

  svg {
    opacity:0.6;
  }
  
  p {
    color:${props => props.lead};
    padding-left:1rem;
  }
`;



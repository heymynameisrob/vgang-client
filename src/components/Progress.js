import React from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import styled from 'styled-components';

export const ProgressCircle = (props) => {
  const {pc, label, children, size, color} = props;
  return(
    <StyledProgressWrapper size={size} color={color}>
      <CircularProgressbar value={pc} text={label} />
      <StyledProgressDetail color={color}>
        {children}
      </StyledProgressDetail>
    </StyledProgressWrapper>
  )
}

const StyledProgressWrapper = styled.div`
  position:relative;
  margin:1.5rem auto;
  max-width:${props => props.size == 'large' ? '16rem' : '6rem'};

  @media(min-width:56rem) {
    max-width:${props => props.size == 'large' ? '24rem' : '8rem'};
  }
  
  .CircularProgressbar .CircularProgressbar-path {
    stroke:${props => props.color || props.theme.colors.pear};
  }  

  .CircularProgressbar .CircularProgressbar-trail {
    stroke:${props => props.theme.colors.grey};
  }  

  .CircularProgressbar .CircularProgressbar-text {
    font-family:'Inter';
    font-size:2rem;
    fill:${props => props.theme.colors.textPrimary};
  }  
`
const StyledProgressDetail = styled.div`
  position:absolute;
  top:0;
  left:0;
  width:100%;
  height:100%;
  display:flex;
  justify-content:center;
  align-items:center;
  flex-flow:column nowrap;
  text-align:center;

  h1, h2, h3, h4 {
    margin:0.25rem 0;
  }
  p.completed {
    color:${props => props.color || props.theme.colors.pear};
    font-weight:500;
    margin-top:.5rem;
  }
  p, small {
    color:${props => props.theme.colors.textSecondary};
  }
`;
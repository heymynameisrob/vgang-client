import React from 'react';
import styled from 'styled-components';
import Skeleton from 'react-loading-skeleton';
const dayjs = require('dayjs');

export const LoadingListSkeleton = () => {
  return <Skeleton count={5} />
}
export const LoadingSpinner = (props) => {
  const {fixed, size, color} = props;
  return (
    <StyledLoadingSpinnerWrap fixed={fixed}>
      <StyledLoadingSpinner size={size} color={color}/>          
    </StyledLoadingSpinnerWrap>
  );
};

export const isObject = (value) => {
  return value && typeof value === 'object' && value.constructor === Object;
}

export const objExists = (obj) => {
  return Object.keys(obj).includes("id");
}

export const getDaysLeftPc = (start, end) => {
  const startDate = dayjs(start, 'D');
  const endDate = dayjs(end, 'D');  
  return 100 - (endDate.diff(dayjs(), 'h') / endDate.diff(startDate, 'h') * 100);
}

export const getOverallChallengeTime = (start, end) => {
  const startDate = dayjs(start, 'h');
  const endDate = dayjs(end, 'h');  
  const total = endDate.diff(startDate, 'h');
  return dayjs(total).format("d days, h hours")
}

export const convertToTitleCase = (string) => {
  var sentence = string.toLowerCase().split(" ");
  for(var i = 0; i< sentence.length; i++){
     sentence[i] = sentence[i][0].toUpperCase() + sentence[i].slice(1);
  }
  
  return sentence.join(" ");
}

export const readableColor = (hexcolor) => {
	// If a leading # is provided, remove it
	if (hexcolor.slice(0, 1) === '#') {
		hexcolor = hexcolor.slice(1);
	}

	// If a three-character hexcode, make six-character
	if (hexcolor.length === 3) {
		hexcolor = hexcolor.split('').map(function (hex) {
			return hex + hex;
		}).join('');
	}

	// Convert to RGB value
	var r = parseInt(hexcolor.substr(0,2),16);
	var g = parseInt(hexcolor.substr(2,2),16);
	var b = parseInt(hexcolor.substr(4,2),16);

	// Get YIQ ratio
	var yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;

	// Check contrast
	return (yiq >= 128) ? 'rgba(0,0,0,0.9)' : 'rgba(255,255,255,0.9)';
}


const StyledLoadingSpinnerWrap = styled.div`
  position:${props => props.fixed ? 'fixed' : 'static'};
  top:0;
  left:0;
  width:${props => props.fixed ? '100%' : 'auto'};;
  height:${props => props.fixed ? '100%' : 'auto'};
  z-index:998;
  background-color:${props => props.fixed ? 'rgba(255,255,255,0.2)' : 'transparent'};
  display:flex;
  justify-content:center;
  align-items:center;  

`;
const StyledLoadingSpinner = styled.div`
  --faded-color:rgba(45, 134, 76, 0.2);
  --color:rgba(45, 134, 76, 1);  
  border-radius: 50%;
  width: ${props => props.size === 'large' ? '10rem' : '3rem'};
  height: ${props => props.size === 'large' ? '10rem' : '3rem'};
  margin: 60px auto;
  font-size: 10px;
  position: relative;
  text-indent: -9999em;
  border-top: ${props => props.size === 'large' ? '1.1rem' : '0.25rem'} solid var(--faded-color);
  border-right: ${props => props.size === 'large' ? '1.1rem' : '0.25rem'} solid var(--faded-color);
  border-bottom: ${props => props.size === 'large' ? '1.1rem' : '0.25rem'} solid var(--faded-color);
  border-left: ${props => props.size === 'large' ? '1.1rem' : '0.25rem'} solid var(--color);
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-animation: load8 1.1s infinite linear;
  animation: load8 1.1s infinite linear;
  @-webkit-keyframes load8 {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
  @keyframes load8 {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }

  &::after {
    border-radius: 50%;
    width: 10em;
    height: 10em;
  }
`;

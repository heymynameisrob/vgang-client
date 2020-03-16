import React from 'react';
import styled from 'styled-components';
import Skeleton from 'react-loading-skeleton';
const dayjs = require('dayjs');

export const LoadingListSkeleton = () => {
  return <Skeleton count={5} />
}
export const LoadingSpinner = ({ fixed }) => {
  return (
    <StyledLoadingSpinnerWrap fixed={fixed}>
      <div>
        <StyledLoadingSpinner />
      </div>
    </StyledLoadingSpinnerWrap>
  );
};

export const getDaysLeftPc = (start, end) => {
  const startDate = dayjs(start);
  const endDate = dayjs(end);  
  return 100 - (endDate.diff(dayjs(), 'h') / endDate.diff(startDate, 'h') * 100);
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
  height:${props => props.fixed ? '100%' : 'auto'};;
  z-index:998;
  background-color:rgba(255,255,255,0.64);
  display:flex;
  justify-content:center;
  align-items:center;  

`;
const StyledLoadingSpinner = styled.div`
  border-radius: 50%;
  width: 10em;
  height: 10em;
  margin: 60px auto;
  font-size: 10px;
  position: relative;
  text-indent: -9999em;
  border-top: 1.1em solid rgba(45, 134, 76, 0.2);
  border-right: 1.1em solid rgba(45, 134, 76, 0.2);
  border-bottom: 1.1em solid rgba(45, 134, 76, 0.2);
  border-left: 1.1em solid rgba(45, 134, 76, 1);
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

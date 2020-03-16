import React, {useContext, useEffect, useState} from 'react';
import {Link, useParams, Redirect} from 'react-router-dom';
import styled, { ThemeContext } from 'styled-components';
import {getDaysLeftPc} from '../components/Helpers';
import {ProgressCircle} from '../components/Progress';
import {PrimaryButton, SecondaryButton} from '../components/Buttons';
import {ViewContainer, ViewLayout, ViewLayoutCenter} from './index.js';
import {DataContext, useData, DataProvider} from '../context/DataProvider';
import { LoadingListSkeleton, LoadingSpinner } from '../components/Helpers.js';
import { ChallengeCard } from '../components/Cards';
import {ChallengeData} from '../data/ChallengeData';

const Modal = React.lazy(
  () => import('../components/Overlays').then(module => ({ default: module.Modal }))
)

const dayjs = require('dayjs')

const ChallengeList = (props) => {
  return(
    <ViewLayout>
      {ChallengeData.map(c => {
          const {id, timeFrameDays, ...rest} = c;
          return(
            <Link to={`/challenge/${id}`} key={id}>
              <ChallengeCard time={timeFrameDays} {...rest} />
            </Link>
          )
        })}      
    </ViewLayout>
  )
}

export const ChallengeDetail = (props) => {
  let { id } = useParams();  
  const {startChallenge} = useData();
  const getData = ChallengeData.filter(obj => obj.id === id);
  const [modalOpen, setModalOpen] = useState(false);  
  const [challengeData, setChallengeData] = useState(getData[0]);
  const {title, desc, tips, timeFrameDays, baseColor} = challengeData

  useEffect(() => {
    setChallengeData({
      ...challengeData,
      stateDate:dayjs().toString(),
      endDate:dayjs().add(timeFrameDays, 'day').toString()
    })
  }, [])

  return(    
    <ViewContainer title={title} childView={true} baseColor={baseColor}>
      <ViewLayout>
        <StyledChallengeDetails>          
          <p>{desc}</p>                          
          <ProgressCircle pc="100" color={baseColor}>
            <h3>{timeFrameDays}</h3>
            <small>days</small>            
          </ProgressCircle>
        </StyledChallengeDetails>
        <StyledChallengeTips>
          <h5>Tips to help you through</h5>
          <ul>
            {tips.map(tip => {return( <li key={tip}>{tip}</li>)})}
          </ul>
         </StyledChallengeTips>
        <PrimaryButton label="Start fast" size="large" onClick={() => {startChallenge(challengeData); setModalOpen(true)}}/>
      </ViewLayout>
      <React.Suspense fallback={<LoadingSpinner fixed={true}/>}>
        <Modal isOpen={modalOpen}>
          <StyledModalInner>
            <img src="https://placehold.it/200x200" />
            <h3>Congratulations</h3>
            <p>You have started the challenge {title}. Good luck!</p>
            <Link to="/challenge" className="link">Thanks!</Link>
          </StyledModalInner>
        </Modal>
      </React.Suspense>
    </ViewContainer>
  )
}

export const ChallengeCurrent = ({data}) => {
  const {tips, endDate, startDate, emoji, title, baseColor, timeFrameDays} = data;
  
  return (
    <ViewLayout>
      <StyledChallengeCurrentDetail>
        <h2>You're doing great</h2>
        <p>{tips[0]}</p>
        <StyledChallengeTitle base={baseColor}>
          {emoji} {title}
        </StyledChallengeTitle>
        <ProgressCircle pc={getDaysLeftPc(startDate, endDate)} color={baseColor} size="large">
          <h2>{dayjs(endDate).diff(startDate, 'd')}</h2>
          <small>days left</small>        
          <p>{Math.round(getDaysLeftPc(startDate, endDate))}% completed</p>    
        </ProgressCircle>
      </StyledChallengeCurrentDetail>
    </ViewLayout>
  )
}

const Challenge = () => {
  const {challenge, getCurrentChallenge} = useData();  
   const [isChallengeCurrent, setIsChallengeCurrent] = useState();

  useEffect(() => {
    getCurrentChallenge().then(res => {
      setIsChallengeCurrent(res);
    })
  }, []);  

  if(!challenge) {
    return <LoadingListSkeleton />
  }

  return (
    <ViewContainer title={'Challenges'}>
      {isChallengeCurrent ? <ChallengeCurrent data={challenge} /> : <ChallengeList />}
    </ViewContainer>
  );
}

export default Challenge;

const StyledChallengeDetails = styled.div`
  display:block;
  text-align:center;  

  p {
    max-width:28ch;
    margin-left:auto;
    margin-right:auto;
  }
`;
const StyledChallengeTips = styled.div`
  display:block;
  padding:1.5rem;
  text-align:center;
  border-radius:0.25rem;
  margin-top:1.5rem;
  border:1px dashed ${props => props.theme.colors.grey};

  ul {
    text-align:left;    
  }
  ul li {
    list-style-type:disc;
    padding:0.5rem 0;
  }
`;

const StyledModalInner = styled.div`
  display:flex;
  justify-content:center;
  align-items:center;
  flex-flow:column nowrap;
  text-align:center;
  
  img {
    margin-bottom:1.5rem;
    border-radius:50%;
  }
  p {
    max-width:30ch;
    margin-left:auto;
    margin-right:auto;
    margin-bottom:1.5rem;
  }
`;

const StyledChallengeCurrentDetail = styled.div`
  display:block;
  text-align:center;
`

const StyledChallengeTitle = styled.div`
  display:inline-block;
  background-color:${props => props.theme.colors.grey};
  padding:.5rem 1rem;
  margin:1rem auto 3rem auto;  
  color:${props => props.theme.colors.textSecondary};
  text-align:center;
  border-radius:4rem;  
`


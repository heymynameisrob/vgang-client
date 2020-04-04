import React, {useEffect, useState} from 'react';
import {Link, useParams, useHistory} from 'react-router-dom';
import styled from 'styled-components';
import {isEmpty} from 'lodash';

import {getDaysLeftPc, objExists, getOverallChallengeTime} from '../components/Helpers'; 
import {ProgressCircle} from '../components/Progress';
import {PrimaryButton, SecondaryButton, ChallengeButton} from '../components/Buttons';
import {ViewContainer, ViewLayout, ViewLayoutCenter} from './index.js';
import {useData} from '../context/DataProvider';
import { LoadingListSkeleton, LoadingSpinner } from '../components/Helpers.js';
import { ChallengeCard } from '../components/Cards';
import {ChallengeData} from '../data/ChallengeData';

const Modal = React.lazy(() => import('../components/Overlays').then(module => ({ default: module.Modal })));
const dayjs = require('dayjs');

// Challenge List
const ChallengeList = (props) => {
  return(
    <ViewLayout {...props}>
      {ChallengeData.map(c => {
          const {id, timeFrameDays, ...rest} = c;
          return(
            <Link to={`/challenge/details/${id}`} key={id}>
              <ChallengeCard time={timeFrameDays} {...rest} />
            </Link>
          )
        })}      
    </ViewLayout>
  )
}

export const ChallengeDetail = (props) => {
  let { id } = useParams();  
  const {startChallenge, getCurrentChallenge} = useData();
  const history = useHistory();
  const getData = ChallengeData.filter(obj => obj.id === id);
  const [confModalOpen, setConfModalOpen] = useState(false);  
  const [alertModalOpen, setAlertModalOpen] = useState(false);  
  const [challengeData, setChallengeData] = useState(getData[0]);

  // Post challenge data with start/end times to DB
  useEffect(() => {
    setChallengeData({
      ...challengeData,
      startDate:dayjs().toString(),
      endDate:dayjs().add(timeFrameDays, 'day').toString()
    });
  }, []);


  const {title, desc, tips, timeFrameDays, baseColor} = challengeData

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
        <PrimaryButton label="Start challenge" size="large" 
        onClick={() => {
          getCurrentChallenge().then(dataExists => {            
            if(dataExists) {
              setAlertModalOpen(true);            
              return
            }
            startChallenge(challengeData);
            setConfModalOpen(true);            
           }); 
        }} />
      </ViewLayout>
      <React.Suspense fallback={<LoadingSpinner fixed={true}/>}>
        <Modal isOpen={confModalOpen} onCloseRequest={() => setConfModalOpen(false)}>
          <StyledModalInner>
            <img src="https://placehold.it/200x200" />
            <h3>Congratulations</h3>
            <p>You have started the challenge {title}. Good luck!</p>
            <Link to="/challenge" className="link">Thanks!</Link>
          </StyledModalInner>
        </Modal>
        <Modal isOpen={alertModalOpen} onCloseRequest={() => setAlertModalOpen(false)}>
          <StyledModalInner>            
            <h3>You already have a current challenge</h3>
            <p>If you start a new challenge, you will lose all your progress on your current one.</p>
            <SecondaryButton onClick={() => {startChallenge(challengeData); setAlertModalOpen(false); history.push('/challenge')}} label="Start new challenge" size="large"/>
            <a onClick={() => {setAlertModalOpen(false)}} className="link">Dismiss!</a>
          </StyledModalInner>
        </Modal>
      </React.Suspense>
    </ViewContainer>
  )
}

export const ChallengeCurrent = ({data}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const history = useHistory();
  const {tips, endDate, startDate, emoji, title, baseColor, timeFrameDays} = data;   
  const hasChallengeEnded = dayjs().isAfter('endDate');
  
  if(!hasChallengeEnded) {
    history.push('/challenge/complete');
  }

  return (
    <ViewLayout>
      <StyledChallengeCurrentDetail>
        <h2>You're doing great</h2>
        <p>{tips[Math.round(Math.random()*(tips.length-1))]}</p>
        <ChallengeButton title={`${emoji} ${title}`} base={baseColor} onClick={() => setModalOpen(true)}/>
        <ProgressCircle pc={getDaysLeftPc(startDate, endDate)} color={baseColor} size="large">
          <h1>{dayjs(endDate).diff(startDate, 'd')} days</h1>
          <small>remaining</small>        
          <p className="completed">{Math.round(getDaysLeftPc(startDate, endDate))}% completed</p>    
        </ProgressCircle>
      </StyledChallengeCurrentDetail>
      <StyledLinkWrap>
        <a href="#" className="link">Pause challenge</a>
      </StyledLinkWrap>
      <React.Suspense fallback={<LoadingSpinner fixed={true}/>}>
        <Modal isOpen={modalOpen} onCloseRequest={() => setModalOpen(false)}>
          <h3>Choose a new challenge</h3>
          <ChallengeList style={{padding:'2rem 1.5rem'}}/>
          <StyledLinkWrap>
            <a onClick={() => setModalOpen(false)} className="link">Close</a>          
          </StyledLinkWrap>
        </Modal>
      </React.Suspense>
    </ViewLayout>
  )
}

export const ChallengeComplete = () => {
  const {getCompletedChallenge, completeChallenge} = useData();
  const [challenge, setChallenge] = useState();

  useEffect(() => {
    completeChallenge()
    .then((id) =>{
      return getCompletedChallenge(id)
    })
    .then(res => {
      setChallenge(res)     
    })
  },[]);

  if(!challenge) {
    return <LoadingSpinner fixed={true} size="large" />
  }  

  const {title, emoji, baseColor, endDate, startDate, timeFrameDays} = challenge;

  return(    
    <ViewContainer title="Completed challenge" childView={true} baseColor={baseColor}>
      <ViewLayout noPad="true">
        <StyledChallengeOutcome>
          <h5>Challenge time</h5>
          <h1>{timeFrameDays} days</h1>
          <ChallengeButton title={`${emoji} ${title}`} base={baseColor} />
        </StyledChallengeOutcome>
        <StyledChallengeDates>
          <div>
            <h5>Started</h5>
            <p>{dayjs(startDate).format('dddd DD MMMM')}</p>
          </div>
          <div>
            <h5>Finished</h5>
            <p>{dayjs(endDate).format('dddd DD MMMM')}</p>
          </div>   
        </StyledChallengeDates>   
        <div style={{padding: '1.5rem', marginTop: 'auto'}}>
          <Link path="/challenges">
            <SecondaryButton label="Back to challenges" size="large" />
          </Link>
        </div>
      </ViewLayout>
    </ViewContainer>
  )
}

const Challenge = () => {
  const {challenge, getCurrentChallenge} = useData();  

  // Get latest challenge data
  useEffect(() => {
    getCurrentChallenge();           
  }, []);    

  
  if(challenge == null) {    
    return <LoadingSpinner size="large" fixed="fixed" />
  }

  return (
    <ViewContainer title={'Challenges'}>      
      {!isEmpty(challenge) ? <ChallengeCurrent data={challenge} /> : <ChallengeList />}      
    </ViewContainer>
  );
}

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
const StyledLinkWrap = styled.div`
  display:inline-block;
  margin:1rem auto;
`

const StyledChallengeOutcome = styled.div`
  display:block;
  text-align:center;
  padding:1.5rem;
`
const StyledChallengeDates = styled.div`
  display:grid;
  grid-template-columns:repeat(2, 1fr);
  grid-grap:1.5rem;
  text-align:center;
  padding:1.5rem;
  border-top:1px dashed ${props => props.theme.colors.grey};

  p {
    margin-top:0.5rem;
    color:${props => props.theme.colors.textPrimary};
  }
`

export default Challenge;
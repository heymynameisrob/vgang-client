import React from 'react';
import {ViewContainer, ViewLayout } from './index';
import { Tabs } from '../components/Tabs';

const Learn = () => {
  return (
    <ViewContainer title={'Learn'}>
      <Tabs>
        <div label="Stats">
          <p>Stats</p>
        </div>
        <div label="Articles">
          <p>Articles</p>          
        </div>
      </Tabs>

    </ViewContainer>
  );
};

export default Learn;
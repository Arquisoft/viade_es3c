import React from 'react';
import {RouteCard} from './myfriends.style';

const InfoFriends = props => {
  const {name, url} = props;
  return(
    <RouteCard className="card">
      <h3>{name}</h3>
        <p> Pod: {url}</p>
      </RouteCard>
  );
};

export default InfoFriends;

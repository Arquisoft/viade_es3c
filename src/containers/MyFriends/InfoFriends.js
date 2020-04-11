import React from 'react';
import {RouteCard, Button} from './myfriends.style';

const InfoFriends = props => {
  const {name, url} = props;
  return(
    <RouteCard className="card">
      <h3>{name}</h3>
        <p> Perfil: {url}</p>
        
      </RouteCard>
  );
};

export default InfoFriends;

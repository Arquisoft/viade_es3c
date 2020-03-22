import React from 'react';
import {RouteCard, Button} from './myfriends.style';

const InfoFriends = props => {
  const {name, url} = props;
  return(
    <RouteCard className="card">
      <h3>{name}</h3>
        <p>{url}</p>
      <div>
        <Button id="viewRoute">Ver ruta</Button>  
      </div>
      </RouteCard>
  );
};

export default InfoFriends;
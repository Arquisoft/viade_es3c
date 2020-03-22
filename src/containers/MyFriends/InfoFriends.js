import React from 'react';
import {RouteCard, Button} from './myfriends.style';

const InfoFriends = props => {
  const {nombre, rutas} = props;
  return(
    <RouteCard className="card">
      <h3>{nombre}</h3>
        <p>{rutas}</p>
      </RouteCard>
  );
};

export default InfoFriends;

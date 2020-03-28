import React from 'react';
import {RouteCard, Button} from './myroutes.style';

const InfoRoute = props => {
  const {title, description, author} = props;
  return(
    <RouteCard className="card">
      <h3>{title}</h3>
        <p>{author}</p>
        <p>{description}</p>
      <div>
        <Button id="viewRoute">Ver ruta</Button>  
      </div>
      </RouteCard>
  );
};

export default InfoRoute;
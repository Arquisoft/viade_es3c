import React, { useState } from "react";
import { RouteCard, Button } from "./myroutes.style";
import {
  FormRenderContainer,
  Header
} from "../MyFriends/myfriends.style";
import RouteMap from "./RouteMap";
import MyFriends from "../MyFriends";
import Share from "../Share";


const InfoRoute = props => {
  const { name, description, author, points } = props;
  const [show, setShow] = useState(true);
  const [showRoute, setShowRoute] = useState(true);

  return (
    <RouteCard className="card">
      <h2>{name}</h2>
      <h3> Ruta creada por: </h3>
      <p>{author}</p>
      <h3> Descripción de la ruta: </h3>
      <p>{description}</p>
      <div>
        <Button id="viewRoute" onClick={() => setShowRoute(!showRoute)}>
        Ver ruta en el mapa
        </Button>
      </div>
      <br></br>
      <div id="button">
        <Button id="viewFriends" onClick={() => setShow(!show)}>
          Compartir con ...
        </Button>
      </div>
      <br></br>

      {showRoute ? (
        <div></div>
      ) : (
        <FormRenderContainer>
        <div>
            <RouteMap zoom={13} />
        </div>
        </FormRenderContainer>
      )}

      {show ? (
        <div></div>
      ) : (
        <FormRenderContainer>
          <Header>
            <h1>My friends</h1>
          </Header>
            <Share ruta={name} autor={author}></Share>
        </FormRenderContainer>
      )}
    </RouteCard>
  );
};

export default InfoRoute;


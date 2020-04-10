import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { RouteCard, Button } from "./myroutes.style";
import { ldflexHelper } from "@utils";
import {
  FormRenderContainer,
  FriendsList,
  Header
} from "../MyFriends/myfriends.style";
import { List } from "@solid/react";
import RouteMap from "./RouteMap";

import MultsButton from "./ViewMult";

const InfoRoute = props => {
  const { name, author, description, points, center, mult, r } = props;
  const [show, setShow] = useState(true);
  const [showRoute, setShowRoute] = useState(true);

  return (
    <RouteCard className="card">
      <div>
        <Button
          type="button"
          onClick={e => {
            if (window.confirm("Are you sure you wish to delete this item?")){
              ldflexHelper.deleteFile(r);
              window.location.reload();
            }

          }}
        >
          <FontAwesomeIcon icon="trash" className="trash-icon" />
        </Button>
      </div>
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
          Ver amigos
        </Button>
      </div>
      <br></br>
      <div>
        <MultsButton {...{ mult }}></MultsButton>
      </div>
      {showRoute ? (
        <div></div>
      ) : (
        <FormRenderContainer id="mapa">
          <RouteMap markers={points} center={center} />
        </FormRenderContainer>
      )}

      {show ? (
        <div></div>
      ) : (
        <FormRenderContainer>
          <Header>
            <h1>My friends</h1>
          </Header>
          <FriendsList>
            <List src={"user.friends"}>
              {(item, i) => (
                <li key={i}>{<a href={`${item}`}>{`${item}`}</a>}</li>
              )}
            </List>
          </FriendsList>
        </FormRenderContainer>
      )}
    </RouteCard>
  );
};

export default InfoRoute;

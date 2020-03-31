import React, { useState } from "react";
import { RouteCard, Button } from "./myroutes.style";

import {
  FormRenderContainer,
  FriendsList,
  Header
} from "../MyFriends/myfriends.style";
import { List } from "@solid/react";

const InfoRoute = props => {
  const { name, description, author } = props;
  const [show, setShow] = useState(true);

  return (
    <RouteCard className="card">
      <h2>{name}</h2>
      <h3> Ruta creada por: </h3>
      <p>{author}</p>
      <h3> Descripción de la ruta: </h3>
      <p>{description}</p>
      <div>
        <Button id="viewRoute">Ver ruta en el mapa</Button>
      </div>
      <br></br>
      <div id="button">
        <Button id="viewFriends" onClick={() => setShow(!show)}>
          Ver amigos
        </Button>
      </div>
      <br></br>

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

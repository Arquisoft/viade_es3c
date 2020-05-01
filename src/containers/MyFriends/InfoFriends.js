import React from "react";
import { RouteCard, Button } from "./myfriends.style";
import { removeFriend } from "./MyFriends";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const InfoFriends = props => {
  const { name, url, webidUser, webidFriend } = props;

  async function handleClick(e) {
    e.preventDefault();
    await removeFriend(webidUser, webidFriend);
  }

  return (
    <RouteCard className="card">
      <div id="itemAmigo">
        <a href={url}>
          <h3 data-testid="friendId">{name}</h3>
        </a>
      </div>
      <Button id="btnDelete" type="button" onClick={e => handleClick(e)}>
        <FontAwesomeIcon icon="user-minus" className="user-minus-icon" />
      </Button>
    </RouteCard>
  );
};

export default InfoFriends;

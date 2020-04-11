import React from "react";
import { RouteCard, ButtonDelete } from "./myfriends.style";
import { removeFriend, refreshPage } from "./MyFriends";

const InfoFriends = (props) => {
	const { name, url, webidUser, webidFriend } = props;

	function handleClick(e) {
		e.preventDefault();
		removeFriend(props.webidUser, props.webidFriend);
		console.log(props.webidUser);
		console.log(props.webidFriend);
		refreshPage();
	}

	return (
		<RouteCard className="card">
			<h3>{name}</h3>
			<p> Perfil: {url}</p>
			<ButtonDelete onClick={(e) => handleClick(e)}>Delete friend</ButtonDelete>
		</RouteCard>
	);
};

export default InfoFriends;

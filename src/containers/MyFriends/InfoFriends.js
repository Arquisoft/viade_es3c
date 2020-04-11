import React from "react";
import { RouteCard, ButtonDelete } from "./myfriends.style";
import { removeFriend } from "./MyFriends";

const InfoFriends = (props) => {
	const { name, url, webidUser, webidFriend } = props;

	async function handleClick(e) {
		e.preventDefault();
		await removeFriend(webidUser, webidFriend);
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

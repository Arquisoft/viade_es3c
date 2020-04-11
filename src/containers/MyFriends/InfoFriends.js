import React from "react";
import { RouteCard, ButtonDelete } from "./myfriends.style";
import { removeFriend, refreshPage } from "./MyFriends";
import { successToaster } from "@utils";

const InfoFriends = (props) => {
	const { name, url, webidUser, webidFriend } = props;

	async function handleClick(e) {
		e.preventDefault();
		await removeFriend(props.webidUser, props.webidFriend);
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

import React from "react";
import { RouteCard, ButtonDelete } from "./myfriends.style";
import { removeFriend } from "./MyFriends";
import i18n from "i18n";

const InfoFriends = (props) => {
	const { name, url, webidUser, webidFriend } = props;

	async function handleClick(e) {
		e.preventDefault();
		await removeFriend(webidUser, webidFriend);
	}

	return (
		<RouteCard className="card">
			<h3 data-testid="friendId">{name}</h3>
			<p>{i18n.t("myFriends.perfil")} {url}</p>
			<ButtonDelete id="delete_friend" onClick={(e) => handleClick(e)}>{i18n.t("myFriends.delete")}</ButtonDelete>
		</RouteCard>
	);
};

export default InfoFriends;

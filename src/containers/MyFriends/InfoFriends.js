import React from "react";
import { RouteCard, ButtonDelete, Button } from "./myfriends.style";
import { removeFriend } from "./MyFriends";
import i18n from "i18n";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const InfoFriends = (props) => {
	const { name, url, webidUser, webidFriend } = props;

	async function handleClick(e) {
		e.preventDefault();
		await removeFriend(webidUser, webidFriend);
	}

	return (
		<RouteCard className="card">
			<a href={url}>
				<h3>{name}</h3>
				<Button id="btnDelete" type="button" onClick={(e) => handleClick(e)}>
					<FontAwesomeIcon icon="trash" className="trash-icon" />
				</Button>
			</a>
		</RouteCard>
	);
};

export default InfoFriends;

import React from "react";
import { sharing } from "../../utils/permissions";
import { getUrl, getUserName } from "../MyFriends/MyFriends";
import Notifications from "./NotificationHelp";
type Props = { webId: String };

class Share extends React.Component {
	constructor({ webId }: Props) {
		super();
		this.webID = webId;
	}

	permit(friend, route, autor) {
		//https://sonialavandera.solid.community/profile/card#me
		//https://sonialavandera.solid.community/private/viade/Prueba_sonialavandera.ttl
		let nameRoute = getUrl(this.webID) + "private/viade/" + route + "_" + autor + ".ttl";
		sharing(this.webID, friend, nameRoute);
		alert("Ruta: " + route + " compartida con " + friend);
	}

	handleClick = (friend, e) => {
		e.preventDefault();
		Notifications(this.props.ruta);
		this.permit(friend, this.props.ruta, this.props.autor);
	};

	render(): React.ReactNode {
		return Notifications(this.props.ruta);
	}
}

export default Share;

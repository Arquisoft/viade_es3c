import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Modal } from "react-bootstrap";
import { RouteCard, Button } from "./myroutes.style";
import { ldflexHelper } from "@utils";
import { successToaster } from "@utils";
import "bootstrap/dist/css/bootstrap.min.css";
import { FormRenderContainer } from "../MyFriends/myfriends.style";
import RouteMap from "./RouteMap";
import Notifications from "../Share/NotificationHelp";
import MultsButton from "./ViewMult";
import i18n from "i18n";
import { Route } from "domain";
import { viadeManager } from "@utils";
import Download from "@axetroy/react-download";
import PrintButton from "../../components/PrintButton";

import { RouteWrapper, TextArea, DivForms, LabelInput } from "../NewRoute/route.style";

var markersp = [];
const InfoRoute = (props) => {
	const { name, author, description, points, center, mult, r, uuid, ttl, error, errorMore, webID, ruta } = props;

	markersp = points;
	if (!error) {
		return (
			<RouteCard className="card" id="card">
				<div id={name}>
					<h2>{name}</h2>
					<h3> {i18n.t("myRoutes.createdBy")} </h3>
					<p>{author}</p>
					<h3> {i18n.t("myRoutes.description")}</h3>
					<p>{description}</p>

					<MultsButton {...{ mult, name }} />

					<br />
					<FormRenderContainer id="mapa">
						<RouteMap markers={points} center={center} />
					</FormRenderContainer>
					<br />
				</div>
			</RouteCard>
		);
	} else {
		return (
			<RouteCard className="card">
				<h5>{error}</h5>
				<p> {errorMore} </p>
			</RouteCard>
		);
	}
};

export default InfoRoute;

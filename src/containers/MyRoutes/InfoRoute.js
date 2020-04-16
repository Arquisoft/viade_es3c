import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Modal } from "react-bootstrap";
import { RouteCard, Button } from "./myroutes.style";
import { ldflexHelper } from "@utils";
import { successToaster } from "@utils";
import "bootstrap/dist/css/bootstrap.min.css";
import { FormRenderContainer, Header } from "../MyFriends/myfriends.style";
import RouteMap from "./RouteMap";
import Notifications from "../Share/NotificationHelp";
import MultsButton from "./ViewMult";
import i18n from "i18n";

const InfoRoute = (props) => {
	const { name, author, description, points, center, mult, r, uuid } = props;
	const [ show, setShow ] = useState(true);
	const [ showConfirm, setShowConfirm ] = useState(false);
	const [ showRoute, setShowRoute ] = useState(true);

	return (
		<RouteCard className="card">
			<div id="divDelete">
				<Button id="btnDelete" type="button" onClick={() => setShowConfirm(!showConfirm)}>
					<FontAwesomeIcon icon="trash" className="trash-icon" />
				</Button>
				<Modal show={showConfirm} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
					<Modal.Header closeButton>
						<Modal.Title id="contained-modal-title-vcenter">{i18n.t("myRoutes.attetion")}</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<h4>{i18n.t("myRoutes.sure")}</h4>
						<p>{i18n.t("myRoutes.deleteMedia")}</p>
					</Modal.Body>
					<Modal.Footer>
						<Button
							onClick={(e) => {
								for (const media of mult) {
									ldflexHelper.deleteFile(media.url);
									ldflexHelper.deleteFile(media.ttlUrl);
								}
								ldflexHelper.deleteFile(r);
								successToaster(i18n.t("myRoutes.deletingMedia"), i18n.t("newRoute.success"));
								setTimeout(function() {
									window.location.reload();
								}, 1500);
							}}
						>
							{i18n.t("myRoutes.btnDelete")}
						</Button>
						<Button onClick={() => setShowConfirm(!showConfirm)}>{i18n.t("myRoutes.btnClose")}</Button>
					</Modal.Footer>
				</Modal>
			</div>

			<h2>{name}</h2>
			<h3> {i18n.t("myRoutes.createdBy")} </h3>
			<p>{author}</p>
			<h3> {i18n.t("myRoutes.description")}</h3>
			<p>{description}</p>
			<div>
				<Button id="viewRoute" onClick={() => setShowRoute(!showRoute)}>
					{i18n.t("myRoutes.btnViewRoute")}
				</Button>
			</div>
			<br />
			<div id="button">
				<Button id="viewFriends" onClick={() => setShow(!show)}>
					{i18n.t("myRoutes.btnShare")}
				</Button>
			</div>
			<br />
			<div>
				<MultsButton {...{ mult, name }} />
			</div>
			{showRoute ? (
				<div />
			) : (
				<FormRenderContainer id="mapa">
					<RouteMap markers={points} center={center} />
				</FormRenderContainer>
			)}

			{show ? (
				<div />
			) : (
				<FormRenderContainer>
					<Header>
						<h1>{i18n.t("myRoutes.friends")}</h1>
					</Header>
					<Notifications ruta={uuid} />
				</FormRenderContainer>
			)}
		</RouteCard>
	);
};

export default InfoRoute;

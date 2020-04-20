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
import { Route, Point, Multimedia } from "domain";
import { viadeManager } from "@utils";

import {
	Header,
	RouteWrapper,
	TextArea,
	DivForms,
	InputSubmit,
	LabelInput,
	TitleRoute,
	RouteForm
} from "../NewRoute/route.style";

const InfoRoute = (props) => {
	const { name, author, description, points, center, mult, r, uuid, error, errorMore, webID } = props;
	const [ show, setShow ] = useState(true);
	const [ showConfirm, setShowConfirm ] = useState(false);
	const [ showConfirmModify, setShowConfirmModify ] = useState(false);

	if (!error) {
		return (
			<RouteCard className="card">
				<div id="divDelete">
					<Button id="btnDelete" type="button" onClick={() => setShowConfirm(!showConfirm)}>
						<FontAwesomeIcon icon="trash" className="trash-icon" />
					</Button>
					<Modal show={showConfirm} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
						<Modal.Header>
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
				<div id="divModificar">
					<Button id="btnModify" type="button" onClick={() => setShowConfirmModify(!showConfirmModify)}>
						<FontAwesomeIcon icon="pen" className="pen-icon" />
					</Button>
					<Modal show={showConfirmModify} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
						<Modal.Header>
							<Modal.Title id="contained-modal-title-vcenter">{i18n.t("myRoutes.attetion")}</Modal.Title>
						</Modal.Header>
						<Modal.Body>
							<RouteForm id="routef">
								<DivForms>
									<LabelInput>
										{i18n.t("newRoute.name")}
										<input type="text" id="route_name" name="route_name" defaultValue={name} />
									</LabelInput>
								</DivForms>
							</RouteForm>
						</Modal.Body>
						<Modal.Footer>
							<Button
								onClick={async () => {
									let route = new Route(
										document.getElementById("route_name").value,
										author,
										description,
										points,
										mult
									);
									ldflexHelper.deleteFile(r);
									await viadeManager.addRoute(route, webID.webId);
									successToaster(i18n.t("newRoute.successRoute"), i18n.t("newRoute.success"));
									setTimeout(function() {
										window.location.href = "#/myRoutes";
									}, 1000);
								}}
							>
								{i18n.t("myRoutes.btnModify")}
							</Button>
							<Button onClick={() => setShowConfirmModify(!showConfirmModify)}>
								{i18n.t("myRoutes.btnClose")}
							</Button>
						</Modal.Footer>
					</Modal>
				</div>
				<h2>{name}</h2>
				<h3> {i18n.t("myRoutes.createdBy")} </h3>
				<p>{author}</p>
				<h3> {i18n.t("myRoutes.description")}</h3>
				<p>{description}</p>
				<div id="divShare" className="btn-group">
					<Button id="viewFriends" type="button" onClick={() => setShow(!show)}>
						{i18n.t("myRoutes.btnShare")}
					</Button>
					<MultsButton {...{ mult, name }} />
				</div>
				{show ? (
					<div />
				) : (
					<FormRenderContainer id="shareRoute">
						<Notifications ruta={uuid} />
					</FormRenderContainer>
				)}
				<br />
				<FormRenderContainer id="mapa">
					<RouteMap markers={points} center={center} />
				</FormRenderContainer>
				<br />
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

import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Modal } from "react-bootstrap";
import { RouteCard, Button } from "./myroutes.style";
import { ldflexHelper } from "@utils";
import { successToaster } from "@utils";
import "bootstrap/dist/css/bootstrap.min.css";
import { FormRenderContainer, FriendsList, Header } from "../MyFriends/myfriends.style";
import { List } from "@solid/react";
import RouteMap from "./RouteMap";
import Notifications from "../Share/NotificationHelp";

import MultsButton from "./ViewMult";

const InfoRoute = (props) => {
	const { name, author, description, points, center, mult, r, uuid } = props;
	const [ show, setShow ] = useState(true);
	const [ showConfirm, setShowConfirm ] = useState(false);
	const [ showRoute, setShowRoute ] = useState(true);

	return (
		<RouteCard className="card">
			<div>
				<Button type="button" onClick={() => setShowConfirm(!showConfirm)}>
					<FontAwesomeIcon icon="trash" className="trash-icon" />
				</Button>
				<Modal show={showConfirm} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
					<Modal.Header closeButton>
						<Modal.Title id="contained-modal-title-vcenter">Attention!</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<h4>Are you sure you wish to delete this item? </h4>
						<p>All the media associate also will be deleted permanently</p>
					</Modal.Body>
					<Modal.Footer>
						<Button
							onClick={(e) => {
								for (const media of mult) {
									ldflexHelper.deleteFile(media.url);
									ldflexHelper.deleteFile(media.ttlUrl);
								}
								ldflexHelper.deleteFile(r);
								successToaster("La ruta se está eliminando", "Éxito");
								setTimeout(function() {
									window.location.reload();
								}, 1500);
							}}
						>
							Delete
						</Button>
						<Button onClick={() => setShowConfirm(!showConfirm)}>Close</Button>
					</Modal.Footer>
				</Modal>
			</div>

			<h2>{name}</h2>
			<h3> Ruta creada por: </h3>
			<p>{author}</p>
			<h3> Descripción de la ruta: </h3>
			<p>{description}</p>
			<div>
				<Button id="viewRoute" onClick={() => setShowRoute(!showRoute)}>
					Ver ruta en el mapa
				</Button>
			</div>
			<br />
			<div id="button">
				<Button id="viewFriends" onClick={() => setShow(!show)}>
					Compartir con ...
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
						<h1>My friends</h1>
					</Header>
					<Notifications ruta={uuid} />
				</FormRenderContainer>
			)}
		</RouteCard>
	);
};

export default InfoRoute;

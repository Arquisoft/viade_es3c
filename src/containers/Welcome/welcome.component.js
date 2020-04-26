import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { WelcomeWrapper, WelcomeCard, WelcomeCardCovid, ButtonInfo } from "./welcome.style";
import { Modal } from "react-bootstrap";
import i18n from "i18n";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "../MyRoutes/myroutes.style";
/**
 * Welcome Page UI component, containing the styled components for the Welcome Page
 * Image component will get theimage context and resolve the value to render.
 * @param props
 */
var count = 0;

export const WelcomePageContent = (props) => {
	const { t } = useTranslation();
	const [ show, setShow ] = useState(true);
	const [ showPopUp, setShowPopUp ] = useState(false);
	if (count === 0) {
		setTimeout(() => {
			setShowPopUp(true);
		}, 2000);
		count = 1;
	}
	return (
		<WelcomeWrapper data-testid="welcome-wrapper">
			<WelcomeCard className="card">
				<h5>
					{t("welcome.welcome")}
					<img id="ubicaciones" src="img/ubicaciones.png" alt="more" />
				</h5>
				<h5>{t("welcome.welcomeSub")}</h5>

				<ButtonInfo id="info" onClick={() => setShow(!show)}>
					<FontAwesomeIcon
						title={t("welcome.knowMore")}
						data-toggle="tooltip"
						icon="info-circle"
						className="info-circle-icon"
					/>
				</ButtonInfo>
				<hr />
				{show ? (
					<div />
				) : (
					<div id="more">
						<h6>{t("welcome.howitworks")}</h6>
						<ul>
							<li>{t("welcome.knowMore1")}</li>
							<li>{t("welcome.knowMore2")}</li>
							<li>{t("welcome.knowMore3")}</li>
						</ul>
						<img src="img/knowMore.png" alt="more" />
						<p />
					</div>
				)}
			</WelcomeCard>

			<div id="divCovid">
				<Modal show={showPopUp} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
					<Modal.Header>
						<Modal.Title id="contained-modal-title-vcenter">{i18n.t("myRoutes.covidWarning")}</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<p>{i18n.t("myRoutes.textCovid")}</p>
						<img id="imgCovid" src="img/covid.png" alt="Covid-19" />
					</Modal.Body>
					<Modal.Footer>
						<Button
							onClick={() => {
								setShowPopUp(false);
								count = 1;
							}}
						>
							{i18n.t("myRoutes.btnClose")}
						</Button>
					</Modal.Footer>
				</Modal>
			</div>
		</WelcomeWrapper>
	);
};

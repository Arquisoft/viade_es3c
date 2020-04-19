import React, { useState } from "react";
import { Uploader } from "@inrupt/solid-react-components";
import { useTranslation } from "react-i18next";
import { WelcomeWrapper, WelcomeCard, WelcomeName, ImageWrapper } from "./welcome.style";
import { ImageProfile } from "@components";
import { errorToaster } from "@utils";
/**
 * Welcome Page UI component, containing the styled components for the Welcome Page
 * Image component will get theimage context and resolve the value to render.
 * @param props
 */
export const WelcomePageContent = (props) => {
	const { webId, image, updatePhoto, name } = props;
	const { t } = useTranslation();
	const limit = 2100000;
	const [ show, setShow ] = useState(true);
	let display;

	return (
		<WelcomeWrapper data-testid="welcome-wrapper">
			<WelcomeCard className="card">
				<h5>{t("welcome.welcome")}</h5>
				<img id="ubicaciones" src="img/ubicaciones.png" alt="more" />
				<h5>{t("welcome.welcomeSub")}</h5>
				<input id="showMore" type="button" onClick={() => setShow(!show)} value={t("welcome.knowMore")} />
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
		</WelcomeWrapper>
	);
};

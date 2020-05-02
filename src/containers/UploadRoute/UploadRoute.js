import React, { useState } from "react";
import { RouteWrapper, RouteContainer, Header, Form, Grid, Label, Input, TextArea } from "./uploadRoute.style";
import Button from "@material-ui/core/Button";
import i18n from "i18n";
import { Multimedia, Route } from "../../domain";
import { errorToaster, successToaster } from "../../utils";
import * as viadeManager from "../../utils/viadeManagerSolid";
import { MultimediaComponent } from "../UploadMultimedia/multimedia.container";
import { ParserFile } from "../../utils/parserFile";

type Props = {
	webId: String
};

const UploadRoute = ({ webId }: Props) => {
	const webID = webId;
	const [ title, setTitle ] = useState("");
	const [ description, setDescription ] = useState("");
	const [ routeFile, setRouteFile ] = useState(null);
	const [ fileToParse, setFileToParse ] = useState("");
	let file = React.createRef();
	let points = [];

	const parser = new ParserFile();

	function chooseParser(file) {
		let type = routeFile.name.split(".").pop();
		console.log(type);
		if (type === "geojson") {
			points = parser.parserGeoJSON(file);
		} else if (type === "gpx") {
			points = parser.parserGPX(file);
		} else {
			errorToaster(i18n.t("uploadRoute.typeFile"), "ERROR");
		}
	}

	function handleTitleChange(event) {
		event.preventDefault();
		setTitle(event.target.value);
	}
	function handleDescriptionChange(event) {
		event.preventDefault();
		setDescription(event.target.value);
	}

	function loaded(file) {
		setFileToParse(file.target.result.toString());
	}

	function handleUpload(event) {
		event.preventDefault();
		if (file.current.files.length > 0) {
			setRouteFile(file.current.files[0]);
			var reader = new FileReader();
			reader.readAsText(file.current.files[0]);
			reader.onload = loaded;
		}
	}

	function handleSave(event) {
		if (title.length === 0) {
			errorToaster(i18n.t("uploadRoute.errorTitle"), "ERROR");
		} else if (description.length === 0) {
			errorToaster(i18n.t("uploadRoute.errorDescription"), "ERROR");
		} else {
			chooseParser(fileToParse);
			if (fileToParse === "") {
				errorToaster(i18n.t("uploadRoute.noFile"), "ERROR");
			} else {
				if (points.length === 0) {
					errorToaster(i18n.t("uploadRoute.errorFile"), "ERROR");
				} else {
					let author = webID.replace("https://", "");
					author = author.replace(".solid.community/profile/card#me", "");
					author = author.replace(".inrupt.net/profile/card#me", "");

					const multimedia = [];
					let filesFolder = document.getElementsByClassName("file-uploader--input");
					let filesMult = filesFolder[0].files;
					let url = webID.replace("profile/card#me", "private/viade/rawMedia/");
					for (let j = 0; j < filesMult.length; j++) {
						let name = filesMult[parseInt(j)].name.split(".")[0];
						name = name.replace(/ /g, "");
						var d = Date(Date.now());
						multimedia.push(
							new Multimedia(
								url + filesMult[parseInt(j)].name.replace(/ /g, ""),
								d.toString(),
								author,
								name,
								null
							)
						);
					}

					let route = new Route(title, author, description, points, multimedia);
					viadeManager.addRoute(route, webID);
					successToaster(i18n.t("uploadRoute.successRoute"), i18n.t("uploadRoute.success"));
					setTimeout(function() {
						window.location.href = "#/myRoutes";
					}, 1000);
				}
			}
			event.preventDefault();
		}
	}
	return (
		<RouteWrapper data-testid="route-wrapper">
			<RouteContainer>
				<Header data-testid="route-header">
					<h1>{i18n.t("uploadRoute.title")}</h1>
					<h2>{i18n.t("uploadRoute.files")}</h2>
				</Header>
				<Form>
					<Grid>
						<Label>
							{" "}
							{i18n.t("uploadRoute.name")}
							<Input type="text" data-testid="route_name" onChange={handleTitleChange} />
						</Label>

						<Label>
							{" "}
							{i18n.t("uploadRoute.description")}
							<TextArea
								type="text"
								data-testid="route_description"
								name="description"
								rows="5"
								onChange={handleDescriptionChange}
							/>
						</Label>
					</Grid>

					<Grid>
						<Label>
							{i18n.t("uploadRoute.uploadFile")}
							<Input type="file" ref={file} onChange={handleUpload} data-testid="input-file" />
						</Label>
					</Grid>
				</Form>

				<MultimediaComponent id={"butonMedia"} webId={`[${webId}]`} image={""} />
				<hr />
				<Button data-testid="bt-save" id="butonSave" onClick={handleSave}>
					{i18n.t("uploadRoute.btnSave")}
				</Button>
			</RouteContainer>
		</RouteWrapper>
	);
};

export default UploadRoute;

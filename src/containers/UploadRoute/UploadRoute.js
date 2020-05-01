import React, { useState } from "react";
import { RouteWrapper, RouteContainer, Header, Form, Grid, Label, Input, TextArea } from "./uploadRoute.style";
import Button from "@material-ui/core/Button";
import i18n from "i18n";
import { Multimedia, Point, Route } from "../../domain";
import { errorToaster, successToaster } from "../../utils";
import * as viadeManager from "../../utils/viadeManagerSolid";
import { MultimediaComponent } from "../UploadMultimedia/multimedia.container";

type Props = {
	webId: String
};

const UploadRoute = ({ webId }: Props) => {
	const webID = webId;
	const [ title, setTitle ] = useState("");
	const [ description, setDescription ] = useState("");
	let file = React.createRef();
	var geojson = "";
	let points = [];

    const webID = webId;
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [geojson, setGeojson] = useState("");
    let file = React.createRef();
    let points = [];

	function handleDescriptionChange(event) {
		event.preventDefault();
		setDescription(event.target.value);
	}

	function loaded(file) {
		geojson = file.target.result.toString();
		console.log(geojson);
	}

    function loaded(file) {
      setGeojson(file.target.result.toString());
    }

	function handleSubmit(event) {
		event.preventDefault();
		handleSave(event);
	}

	function parserGeoJSON(file) {
		var geoObject = JSON.parse(file);
		var features;
		features = geoObject.features;
		if (features.length === 1) {
			if (features[0].geometry.type === "LineString") {
				var coordinates = features[0].geometry.coordinates;
				for (var i = 0; i < coordinates.length; i++) {
					points.push(new Point(coordinates[i][0], coordinates[i][1]));
				}
			}
		}
	}

	function handleSave(event) {
		if (title.length === 0) {
			errorToaster(i18n.t("uploadRoute.errorTitle"), "ERROR");
		} else if (description.length === 0) {
			errorToaster(i18n.t("uploadRoute.errorDescription"), "ERROR");
		} else {
			parserGeoJSON(geojson);
			if (geojson === "") {
				errorToaster(i18n.t("uploadRoute.noFile"), "ERROR");
			} else {
				if (points.length === 0) {
					errorToaster(i18n.t("uploadRoute.errorFile"), "ERROR");
				} else {
					let author = webID.replace("https://", "");
					author = author.replace(".solid.community/profile/card#me", "");
					author = author.replace(".inrupt.net/profile/card#me", "");

    function handleSave(event) {
      if (title.length === 0) {
        errorToaster(i18n.t("uploadRoute.errorTitle"), "ERROR");
      } else if (description.length === 0) {
        errorToaster(i18n.t("uploadRoute.errorDescription"), "ERROR");
      } else if (geojson === "") {
        errorToaster(i18n.t("uploadRoute.noFile"), "ERROR");
      } else {
        parserGeoJSON(geojson);
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
    };


					<Grid>
						<Label>
							{i18n.t("uploadRoute.uploadFile")}
							<Input type="file" ref={file} onChange={handleUpload} data-testid="input-file" />
						</Label>
					</Grid>
				</Form>
				<MultimediaComponent id={"input-img"} webId={`[${webId}]`} image="" />
				<Button id="save_route" form="routef" type="submit" onClick={handleSubmit}>
					{i18n.t("uploadRoute.btnSave")}
				</Button>
			</RouteContainer>
		</RouteWrapper>
	);
};

            <Grid>
              <Label>   {i18n.t("uploadRoute.name")}
                <Input type="text" data-testid="route_name" onChange={handleTitleChange}/>
              </Label>

              <Label>   {i18n.t("uploadRoute.description")}
                <TextArea type="text" data-testid="route_description"
                          name="description" rows="5"
                          onChange={handleDescriptionChange}/>
              </Label>

              <MultimediaComponent id={"input-img"} webId={`[${webId}]`} image=""/>
            </Grid>

            <Grid>
              <Label>{i18n.t("uploadRoute.uploadFile")}
                <Input type="file" ref={file} onChange={handleUpload} data-testid="input-file"/>
              </Label>
            </Grid>

            <Button data-testid="bt-save" onClick={handleSave}>
              {i18n.t("uploadRoute.btnSave")}
            </Button>
          </Form>
        </RouteContainer>
      </RouteWrapper>
    );


  }
;

export default UploadRoute;

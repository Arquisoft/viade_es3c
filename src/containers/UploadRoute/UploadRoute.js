import React, { useState } from "react";
import {
  Header,
  Input,
  Label,
  RouteWrapper,
  RouteContainer,
  TextArea,
  DivForms,
  Grid,
  Form,
  GridButton
} from "./uploadRoute.style";
import Button from "@material-ui/core/Button";
import i18n from "i18n";
import { Point, Route } from "../../domain";
import { errorToaster, successToaster } from "../../utils";
import * as viadeManager from "../../utils/viadeManagerSolid";
import { MultimediaComponent } from "../UploadMultimedia/multimedia.container";

type Props = {
  webId: String
};

const UploadRoute = ({ webId }: Props) => {

  const webID = webId;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  let file = React.createRef();
  let geojson = "";
  let points = [];

  function handleTitleChange(event) {
    event.preventDefault();
    setTitle(event.target.value);
  }

  function handleDescriptionChange(event) {
    event.preventDefault();
    setDescription(event.target.value);
  }

  function loaded(file) {
    geojson = file.target.result.toString();
    console.log(geojson);
  }

  function handleUpload(event) {
    event.preventDefault();
    if (file.current.files.length > 0) {
      var reader = new FileReader();
      reader.readAsText(file.current.files[0]);
      reader.onload = loaded;
    }
  }

  function parserGeoJSON(file) {
    var geoObject = JSON.parse(file);
    var features;
    features = geoObject.features;
    if (features.length === 1) {
      if (features[0].geometry.type === "LineString") {
        var coordinates = features[0].geometry.coordinates;
        for (var i = 0; i < coordinates.length; i++) {
          points.push(
            new Point(
              coordinates[i][0], coordinates[i][1]
            )
          );
        }
      }
    }
  }


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

        let route = new Route(title, author, description, points, "");

        viadeManager.addRoute(route, webID);
        successToaster(i18n.t("uploadRoute.successRoute"), i18n.t("uploadRoute.success"));
        setTimeout(function() {
          window.location.href = "#/myRoutes";
        }, 1000);
      }
    }
    event.preventDefault();
  }

  return (
    <RouteWrapper data-testid="route-wrapper">
      <RouteContainer>
        <Header data-testid="route-header">
          <h1>{i18n.t("uploadRoute.title")}</h1>
        </Header>
        <Form>
          <Grid>
            <DivForms>
              <Label>   {i18n.t("uploadRoute.name")}
                <Input type="text" data-testid="route_name" onChange={handleTitleChange} size="70"/>
              </Label>
            </DivForms>

            <DivForms>
              <Label>   {i18n.t("uploadRoute.description")}
                <TextArea type="text" data-testid="route_description"
                          name="description" rows="5"
                          onChange={handleDescriptionChange}/>
              </Label>
            </DivForms>
          </Grid>

          <Grid>
            <Label>{i18n.t("uploadRoute.uploadFile")}
              <Input type="file" ref={file} onChange={handleUpload} data-testid="input-file"/>
            </Label>

          </Grid>

          <DivForms>
            <MultimediaComponent id={"input-img"} webId={`[${webId}]`} image=""/>
          </DivForms>

          <GridButton>
            <Button data-testid="bt-save" onClick={handleSave}> {i18n.t("uploadRoute.btnSave")} </Button>
          </GridButton>

        </Form>
      </RouteContainer>
    </RouteWrapper>
  );


};

export default UploadRoute;

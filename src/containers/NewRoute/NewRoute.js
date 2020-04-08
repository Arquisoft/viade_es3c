/* eslint-disable constructor-super */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-console */

import React from "react";
import Map from "./Map";
import {
    Header,
    RouteWrapper,
    TextArea,
    DivForms,
    InputSubmit,
    LabelInput,
    TitleRoute,
    RouteForm
} from "./route.style";
import { viadeManager } from "@utils";
import { Route, Point, Multimedia } from "domain";
import { MultimediaComponent } from "../UploadMultimedia/multimedia.container"

type Props = { webId: String };

class NewRoute extends React.Component {
    constructor({ webId }: Props) {
        super();
        this.webID = webId;
        this.handleSave = this.handleSave.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.title = React.createRef();
        this.descripton = React.createRef();
    }


    getWebId() {
        return this.webId;
    }

    state = { markers: {}, image: {} };

    callBackFunction = childData => {
        this.setState({ markers: childData });
    };

    handleChange(event) {
        this.setState({ value: event.target.value });
    }
   
    handleSubmit(event) {
        event.preventDefault();
        this.handleSave(event);
    }

    async handleSave(event) {
        if (this.title.current.value.length === 0) {
            alert("La ruta tiene que tener un titulo.");
        } else if (this.descripton.current.value.length === 0) {
            alert("La ruta tiene que tener una descripción.");
        } else if (this.state.markers.length === undefined) {
            alert("No ha marcado ningún punto en el mapa.");
        } else {
            const points = [];
            for (let i = 0; i < this.state.markers.length; i++) {
                points.push(
                    new Point(
                        this.state.markers[i].position.lat,
                        this.state.markers[i].position.lng,
                        this.state.markers[i].position.alt
                    )
                );
            }

            let author = this.webID.replace("https://", "");
            author = author.replace(".solid.community/profile/card#me", "");
            author = author.replace(".inrupt.net/profile/card#me", "");


            const multimedia = [];
            let filesFolder = document.getElementsByClassName('file-uploader--input')
            let filesMult = filesFolder[0].files;
            let url = this.webID.replace("profile/card#me", "public/viade/");
            for (let j = 0; j < filesMult.length; j++) {
                let name = filesMult[j].name.split(".")[0];
                var d = Date(Date.now());
                multimedia.push(new Multimedia(url + filesMult[j].name, d.toString(), author,name));
            }
            let route = new Route(
                this.title.current.value,
                author,
                this.descripton.current.value,
                points,
                multimedia
            );
            await viadeManager.addRoute(route, this.webID);
            alert("Se ha guardado correctamente");
        }
        event.persist();
    }

    render(): React.ReactNode {

        return (
            <RouteWrapper data-testid="route-component">
                <Header>

                    <TitleRoute>New Route</TitleRoute>

                    <RouteForm id="routef">

                        <DivForms>
                            <LabelInput>Name of the route: <input type="text" name="route_name" placeholder="New Route" ref={this.title} /></LabelInput>
                        </DivForms>

                        <DivForms>
                            <LabelInput> Description of the route: <TextArea type="text" name="description" placeholder="Description for the new Route" rows="10" ref={this.descripton} /> </LabelInput>
                        </DivForms>

                        </RouteForm>
                        <DivForms>
                            <MultimediaComponent webId={`[${this.webId}]`} image=""></MultimediaComponent>
                        </DivForms>

                        <DivForms>
                            <InputSubmit type="submit" value="Save" form="routef" onClick={this.handleSubmit} />
                        </DivForms>

                    

                </Header>
                <Map parentCallBack={this.callBackFunction} zoom={13} />
            </RouteWrapper>
        );
    }
}


export default NewRoute;
/* eslint-disable constructor-super */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-console */

import React from "react";
import Map from "./Map";
import { FormModel } from '@inrupt/solid-react-components';
import {
    Header,
    RouteWrapper,
    TextArea,
    DivForms,
    InputSubmit,
    LabelInput,
    InputFile,
    TitleRoute,
    UploaderFiles,
    RouteForm,
    DivDivisor
} from "./route.style";
import { viadeManager } from "@utils";
import { Route, Point, Multimedia } from "domain";
import { MultimediaComponent } from "../UploadMultimedia/multimedia.container"



type Props = { webId: String };


class NewRoute extends React.Component {
    constructor({ webId }: Props) {
        super();
        this.webID = webId;
        console.log(this.webID);
        this.handleSave = this.handleSave.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.title = React.createRef();
        this.descripton = React.createRef();
    }

     
    getWebId() {
        return this.webId;
    }

    state = { markers: {} };

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

            const multimedia = [];
            let filesMult = document.getElementById('files-mult').files
            for (let i = 0; i < filesMult.length; i++) {
                multimedia.push(new Multimedia(filesMult[i].name, filesMult[i]));
                console.log(filesMult[i].name)
            }

            let author = this.webID.replace("https://", "");
            author = author.replace(".solid.community/profile/card#me", "");
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


    encodeImageFileAsURL(file) {
        var reader = new FileReader();
        reader.onloadend = function () {
            console.log('RESULT', reader.result)
        }
        return reader.readAsDataURL(file);
    }

   

    render(): React.ReactNode {
        return (
            <RouteWrapper data-testid="route-component">
                <Header>

                    <TitleRoute>New Route</TitleRoute>

                    <RouteForm onSubmit={this.handleSubmit}>

                        <DivForms>
                            <LabelInput>Name of the route: <input type="text" name="route_name" placeholder="New Route" ref={this.title} /></LabelInput>
                        </DivForms>

                        <DivForms>
                            <LabelInput> Description of the route: <TextArea type="text" name="description" placeholder="Description for the new Route" rows="10" ref={this.descripton} /> </LabelInput>
                        </DivForms>

                        <DivForms>
                            <LabelInput>Upload files</LabelInput><InputFile type="file" id="files-mult" name="files" accept="image/*, video/*" multiple />
                        </DivForms>

                        <DivForms>
                            <InputSubmit type="submit" value="Save" />
                        </DivForms>

                    </RouteForm>

                    <DivDivisor>
                        <UploaderFiles>Upload files</UploaderFiles>
                        <MultimediaComponent>{this.webID}</MultimediaComponent>
                    </DivDivisor>
                </Header>
                <Map parentCallBack={this.callBackFunction} zoom={13} />
            </RouteWrapper>
        );
    }
}

export default NewRoute;
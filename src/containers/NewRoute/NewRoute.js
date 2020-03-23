/* eslint-disable constructor-super */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-console */

import React from "react";
import { Input } from "../TextEditor/text-editor.style";
import Map from "./Map";
import { Header, RouteWrapper, Button } from "./route.style";
import { viadeManager } from "@utils";
import { Route, Point } from "domain";

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
        } else if (this.state.markers.length === undefined ) {
            alert("No ha marcado ningún punto en el mapa.");
        } else {
            const points = new Array();
            for ( let i = 0; i < this.state.markers.length; i++) {
                points.push(
                    new Point(
                        this.state.markers[i].position.lat,
                        this.state.markers[i].position.lng
                    )
                );
            }


            let route = new Route(
                this.title.current.value,
                "Pepe",
                "Falta meter descripcion",
                points
            );
            await viadeManager.addRoute(route, this.webID);
            alert("Se ha guardado correctamente");
        }
        event.preventDefault();
    }

    render(): React.ReactNode {
        return (
            <RouteWrapper data-testid="route-component">
                <Header>
                    <h5 className="text--white">Nombre:</h5>
                    <Input type="text" placeholder="Nueva ruta" ref={this.title} />
                    <Button onClick={this.handleSubmit}> Guardar</Button>
                </Header>
                <Map parentCallBack={this.callBackFunction} zoom={13} />
            </RouteWrapper>
        );
    }
}

export default NewRoute;

/* eslint-disable constructor-super */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-console */

import React from 'react';
import {Input} from "../TextEditor/text-editor.style";
import Map from './Map';
import {
    Header,
    RouteWrapper,
    Button
} from './route.style';

type Props = { webId: String };

class NewRoute extends React.Component{

    constructor({ webId }: Props) {
        super();
        this.webID = webId.replace("profile/card#me","");
        console.log(this.webID);
        this.handleSave = this.handleSave.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.title = React.createRef();
    }

    state = {markers: {}};

    callBackFunction = (childData) => {
        this.setState({markers: childData})
    };

    handleChange(event) {
        this.setState({value: event.target.value});

    }

    handleSubmit(event) {
        event.preventDefault();
        this.handleSave(event);
    }

    handleSave(event){
        if(this.title.current.value.length === 0){
            alert("La ruta tiene que tener un titulo.")
        }else if(this.state.markers === 0){
            alert("No ha marcado ningún punto en el mapa.")
        }else{
            //let route = new Route(this.title.current.value,"Ruta",this.state.markers,this.webID,null,  null,  null);
            //let parser = new RouteToRdfParser(route, this.webID);
            //parser.parse();
            alert("Se ha guardado correctamente");
        }
        event.preventDefault();
    }

    render(): React.ReactNode {
        return (
            <RouteWrapper data-testid="route-component">
                <Header>
                    <h5 className="text--white">Nombre:</h5>
                    <Input type="text" placeholder="Nueva ruta" ref={this.title}/>
                    <Button onClick={this.handleSubmit}> Guardar</Button>
                </Header>
                <Map parentCallBack = {this.callBackFunction} zoom={13}/>
            </RouteWrapper>
        );
    }
};

export default NewRoute;

import React from 'react';
import {successToaster, errorToaster} from '@utils';
import {Loader} from '@util-components';
import Map from './Map';
import {
    Header,
    RouteWrapper,
    Button
} from './route.style';
import {Input} from "../TextEditor/text-editor.style";

function saveRoute() {

}

class NewRoute extends React.Component{

    state = {markers: {}};

    callBackFunction = (childData) => {
        this.setState({markers: childData})
        console.log(this.state.markers);
    };

    render(): React.ReactNode {
        return (
            <RouteWrapper data-testid="route-component">
                <Header>
                    <h5 className="text--white">Nombre:</h5>
                    <Input type="text" size="10" />
                    <Button id="saveRoute" onClick={saveRoute}>Guardar</Button>
                </Header>
                <Map parentCallBack = {this.callBackFunction} zoom={20}/>
            </RouteWrapper>
        );
    }


};

export default NewRoute;

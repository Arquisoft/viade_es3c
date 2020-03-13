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

function saveRoute(name) {
    let routeName = name;
    console.log(name)
}

class NewRoute extends React.Component{

    constructor(props) {
        super(props);
        this.state = {value: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        saveRoute(this.state.value)
    }

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
                    <Input type="text" value={this.state.value} onChange={this.handleChange} />
                    <Button id="saveRoute" type="button" onClick={this.handleSubmit} className="btn">Save</Button>
                </Header>
                <Map parentCallBack = {this.callBackFunction} zoom={13}/>
            </RouteWrapper>
        );
    }
};

export default NewRoute;

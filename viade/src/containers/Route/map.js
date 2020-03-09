import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import React from "react";

const mapStyles = {
    width: '73%',
    height: '100%',
};

export class MapContainer extends React.Component {

    getLocation() {

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                this.setState({
                    center: {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    }
                })
            });
        }
    }

    render() {
        this.getLocation();
        return (
            <Map
                google={this.props.google}
                zoom={8}
                style={mapStyles}
                initialCenter={{ lat: 47.444, lng: -122.176}}
            >
            <Marker position={{ lat: 48.00, lng: -122.00}} />
            </Map>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyB3kcMOsEbg2unbt5yGvqw4HxNlSLE-U00'
})(MapContainer);


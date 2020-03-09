import {Map, GoogleApiWrapper, Marker, Polyline} from 'google-maps-react';
import React from 'react';
import update from 'react-addons-update';

const mapStyles = {
    width: '73%',
    height: '100%',
};

export class MapContainer extends React.Component {

    constructor(props) {
        super(props);
    }

    state = {
        markers: [{
            position: {
                lat: 25.0112183,
                lng: 121.52067570000001,
            },
            key: "Taiwan",
            defaultAnimation: 2
        }],
        center: {
            lat: 40.4165000,
            lng: -3.7025600
        }
    };

    clickPoint = (event, map, clickEvent) => {
        let {markers} = this.state;
        markers = update(markers, {
            $push: [
                {
                    position: {
                        lat: clickEvent.latLng.lat(),
                        lng: clickEvent.latLng.lng(),
                    },
                    defaultAnimation: 2,
                    key: Date.now(),
                },
            ],
        });
        this.setState({markers});
    };

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

    draw() {
        let markers = [];
        for (let i = 0; i < this.state.markers.length; i++) {
            if (i != 0) {
                markers.push({lat: this.state.markers[i].position.lat, lng: this.state.markers[i].position.lng})
            }
        }
        return markers;
    };

    render() {
        this.getLocation();
        return (
            <Map
                google={this.props.google}
                zoom={8}
                style={mapStyles}
                onClick={this.clickPoint}
                center={this.state.center}
            >

            {this.state.markers.map((marker) => {
                return (
                    <Marker position={{lat: marker.position.lat, lng: marker.position.lng}}/>
                );
            })}

            <Polyline
                path={this.draw()}
                strokeColor="#0000FF"
                strokeOpacity={0.8}
                strokeWeight={2}/>

            </Map>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyB3kcMOsEbg2unbt5yGvqw4HxNlSLE-U00'
})(MapContainer);


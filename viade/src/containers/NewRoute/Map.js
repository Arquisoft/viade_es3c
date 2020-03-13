import {Map, GoogleApiWrapper, Marker, Polyline} from 'google-maps-react';
import React from 'react';
import update from 'react-addons-update';

const mapStyles = {
    height: '300px',
};

export class MapContainer extends React.Component {

    constructor(props) {
        super(props);
    }

    sendData = () => {
        this.props.parentCallBack(this.state.markers);
    };

    state = {markers:[]};

    clickPoint = (event, map, clickEvent) => {
        let {markers} = this.state;
        markers = update(markers, {
            $push: [
                {
                    position: {
                        lat: clickEvent.latLng.lat(),
                        lng: clickEvent.latLng.lng()
                    },
                    defaultAnimation: 2,
                    key: Date.now(),
                },
            ],
        });
        this.setState({markers});
        this.sendData();
    };

    getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                this.setState({
                    center: {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    }
                })
            });
        }
    }

    draw() {
        let markers = [];
        for (let i = 0; i < this.state.markers.length; i++) {
            markers.push({lat: this.state.markers[i].position.lat, lng: this.state.markers[i].position.lng})
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
                    <Marker position={{lat: marker.position.lat, lng: marker.position.lng, alt: marker.position.alt}}/>
                );
            })}

            <Polyline
                path={this.draw()}
                strokeColor="#01C9EA"
                strokeOpacity={0.8}
                strokeWeight={2}/>
            </Map>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyB3kcMOsEbg2unbt5yGvqw4HxNlSLE-U00'
})(MapContainer);


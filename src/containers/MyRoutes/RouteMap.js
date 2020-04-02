import {Map, GoogleApiWrapper, Marker, Polyline} from 'google-maps-react';
import React from 'react';

const mapStyle = {
    width: '680px',
    height: '366px'
};

export class MapContainer extends React.Component {

    sendData = () => {
        this.props.parentCallBack(this.state.markers);
    };

    state = {markers:[]};

    draw() {
        let markers = [];
        for (let i = 0; i < this.state.markers.length; i++) {
            markers.push({lat: this.state.markers[i].position.lat, lng: this.state.markers[i].position.lng})
        }
        return markers;
    };

    render() {
        return (
            <Map
                google={this.props.google}
                zoom={13}
                style={mapStyle}
                onClick={this.clickPoint}
                center={this.state.center}
            >
                {this.state.markers.map((marker) => {
                    return (
                        <Marker key={marker.position.lat+marker.position.lng} position={{lat: marker.position.lat, lng: marker.position.lng}}/>
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


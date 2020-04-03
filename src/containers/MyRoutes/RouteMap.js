import {Map, GoogleApiWrapper, Marker, Polyline} from 'google-maps-react';
import React from 'react';
import {Route } from "domain";

const mapStyle = {
    width: '680px',
    height: '366px'
};

const InfoRoute = props => {
  const { markers } = props;
}
/* let point = new Point(37.755998502578144, -122.47157155429458);
let point2 = new Point(37.77743913215115, -122.46642171298599);
const points = [point, point2]; */

export class MapContainer extends React.Component {

      constructor(props) {
        super(props);
        this.state = {markers: props.markers};
  }

    sendData = () => {
        this.props.parentCallBack(this.state.markers);
    };

    draw() {
        let markers = [];
        for (let i = 0; i < this.state.markers.length; i++) {
            markers.push({lat: this.state.markers[i].latitude, lng: this.state.markers[i].longitude})
        }
        return markers;
    };

    render() {
        return (
            <Map
                google={this.props.google}
                zoom={13}
                style={mapStyle}
                center={this.state.center}
            >
                {this.state.markers.map((marker) => {
                    return (
                        <Marker key={marker.latitude+marker.longitude} position={{lat: marker.latitude, lng: marker.longitude}}/>
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


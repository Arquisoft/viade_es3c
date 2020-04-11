import { Map, GoogleApiWrapper, Marker, Polyline } from "google-maps-react";
import React from "react";

const mapStyle = {
	width: "680px",
	height: "366px"
};

export class MapContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = { markers: props.markers, center: props.center };
	}

	componentWillUnmount() {}

	draw() {
		let markers = [];
		for (let i = 0; i < this.state.markers.length; i++) {
			markers.push({
				lat: parseFloat(this.state.markers[i].latitude),
				lng: parseFloat(this.state.markers[i].longitude)
			});
		}
		return markers;
	}

	render() {
		return (
			<Map
				google={this.props.google}
				zoom={13}
				style={mapStyle}
				initialCenter={{ lat: this.state.center[0], lng: this.state.center[1] }}
			>
				{this.state.markers.map((marker) => {
					return (
						<Marker
							key={marker.latitude + marker.longitude}
							position={{ lat: marker.latitude, lng: marker.longitude }}
						/>
					);
				})}

				<Polyline path={this.draw()} strokeColor="#01C9EA" strokeOpacity={0.8} strokeWeight={2} />
			</Map>
		);
	}
}

export default GoogleApiWrapper({
	apiKey: "AIzaSyB3kcMOsEbg2unbt5yGvqw4HxNlSLE-U00"
})(MapContainer);

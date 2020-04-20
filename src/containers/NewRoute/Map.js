import { Map, GoogleApiWrapper, Marker, Polyline } from "google-maps-react";
import React from "react";
import update from "react-addons-update";
import { Button } from "../MyRoutes/myroutes.style";

const mapStyle = {
	paddingBottom: "10px",
	height: "100%"
};

export class MapContainer extends React.Component {
	sendData = () => {
		this.props.parentCallBack(this.state.markers);
	};
	state = { markers: [] };

	getLocation() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition((position) => {
				this.setState({
					center: {
						lat: position.coords.latitude,
						lng: position.coords.longitude
					}
				});
			});
		}
	}

	clickPoint = (event, map, clickEvent) => {
		let { markers } = this.state;
		markers = update(markers, {
			$push: [
				{
					position: {
						lat: clickEvent.latLng.lat(),
						lng: clickEvent.latLng.lng()
					},
					index: this.state.markers.length,
					defaultAnimation: 2,
					key: clickEvent.latLng.lat() + clickEvent.latLng.lng()
				}
			]
		});
		this.setState({ markers });
		this.sendData();
	};

	draw() {
		let markers = [];
		for (let i = 0; i < this.state.markers.length; i++) {
			markers.push({
				lat: this.state.markers[parseInt(i)].position.lat,
				lng: this.state.markers[parseInt(i)].position.lng
			});
		}
		return markers;
	}

	onMarkerClick = (props, marker, e) => {
		let markers2 = props.markersList;
		markers2.splice(props.index, 1);
		this.setState({ markers2 });
		this.sendData();
	};

	render() {
		this.getLocation();
		return (
			<Map
				google={this.props.google}
				zoom={13}
				style={mapStyle}
				onClick={this.clickPoint}
				center={this.state.center}
				styles={[
					{ elementType: "geometry", stylers: [ { color: "#242f3e" } ] },
					{ elementType: "labels.text.stroke", stylers: [ { color: "#242f3e" } ] },
					{ elementType: "labels.text.fill", stylers: [ { color: "#746855" } ] },
					{
						featureType: "administrative.locality",
						elementType: "labels.text.fill",
						stylers: [ { color: "#d59563" } ]
					},
					{
						featureType: "poi",
						elementType: "labels.text.fill",
						stylers: [ { color: "#d59563" } ]
					},
					{
						featureType: "poi.park",
						elementType: "geometry",
						stylers: [ { color: "#263c3f" } ]
					},
					{
						featureType: "poi.park",
						elementType: "labels.text.fill",
						stylers: [ { color: "#6b9a76" } ]
					},
					{
						featureType: "road",
						elementType: "geometry",
						stylers: [ { color: "#38414e" } ]
					},
					{
						featureType: "road",
						elementType: "geometry.stroke",
						stylers: [ { color: "#212a37" } ]
					},
					{
						featureType: "road",
						elementType: "labels.text.fill",
						stylers: [ { color: "#9ca5b3" } ]
					},
					{
						featureType: "road.highway",
						elementType: "geometry",
						stylers: [ { color: "#746855" } ]
					},
					{
						featureType: "road.highway",
						elementType: "geometry.stroke",
						stylers: [ { color: "#1f2835" } ]
					},
					{
						featureType: "road.highway",
						elementType: "labels.text.fill",
						stylers: [ { color: "#f3d19c" } ]
					},
					{
						featureType: "transit",
						elementType: "geometry",
						stylers: [ { color: "#2f3948" } ]
					},
					{
						featureType: "transit.station",
						elementType: "labels.text.fill",
						stylers: [ { color: "#d59563" } ]
					},
					{
						featureType: "water",
						elementType: "geometry",
						stylers: [ { color: "#17263c" } ]
					},
					{
						featureType: "water",
						elementType: "labels.text.fill",
						stylers: [ { color: "#515c6d" } ]
					},
					{
						featureType: "water",
						elementType: "labels.text.stroke",
						stylers: [ { color: "#17263c" } ]
					}
				]}
			>
				{this.state.markers.map((marker) => {
					return (
						<Marker
							key={marker.position.lat + marker.position.lng}
							position={{ lat: marker.position.lat, lng: marker.position.lng }}
							icon={"http://maps.google.com/mapfiles/ms/icons/blue.png"}
							markersList={this.state.markers}
							index={marker.index}
							onClick={this.onMarkerClick}
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

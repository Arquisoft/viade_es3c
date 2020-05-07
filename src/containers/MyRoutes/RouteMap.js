import { Map, GoogleApiWrapper, Marker, Polyline } from "google-maps-react";
import React from "react";
import update from "react-addons-update";
import { Point } from "domain";

const mapStyle = {
	width: "500px",
	height: "300px"
};

export class MapContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			markers: props.markers,
			center: props.center,
			action: props.action
		};
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.markers !== this.props.markers) {
			//Perform some operation
			this.setState({ markers: nextProps.markers, center: nextProps.center, action: nextProps.action });
		}
	}

	sendData = () => {
		this.props.parentCallBack(this.state.markers);
	};
	state = { markers: [] };

	draw() {
		let markers = [];
		for (let i = 0; i < this.state.markers.length; i++) {
			markers.push({
				lat: parseFloat(this.state.markers[parseInt(i, 10)].latitude),
				lng: parseFloat(this.state.markers[parseInt(i, 10)].longitude)
			});
		}
		return markers;
	}

	clickPoint = (event, map, clickEvent) => {
		if (this.state.action) {
			let { markers } = this.state;
			markers = update(markers, {
				$push: [ new Point(String(clickEvent.latLng.lat()), String(clickEvent.latLng.lng())) ]
			});
			this.setState({ markers });
			this.sendData();
		}
	};

	onMarkerClick = (props, marker, e) => {
		if (this.state.action) {
			let markers2 = props.markersList;
			for (var i = 0; i < markers2.length; i++) {
				if (markers2[i].key === props.index) {
					markers2.splice(i, 1);
					this.setState({ markers2 });
					this.sendData();
				}
			}
		}
	};

	render() {
		return (
			<Map
				google={this.props.google}
				zoom={15}
				onClick={this.clickPoint}
				style={mapStyle}
				initialCenter={{ lat: this.state.center[0], lng: this.state.center[1] }}
				center={{ lat: this.state.center[0], lng: this.state.center[1] }}
				styles={[
					{ elementType: "geometry", stylers: [ { color: "#242f3e" } ] },
					{
						elementType: "labels.text.stroke",
						stylers: [ { color: "#242f3e" } ]
					},
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
							key={marker.latitude + marker.longitude}
							position={{ lat: marker.latitude, lng: marker.longitude }}
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

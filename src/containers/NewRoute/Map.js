import { Map, GoogleApiWrapper, Marker, Polyline, HeatMap } from "google-maps-react";
import { Loader } from "@util-components";

import React from "react";
import update from "react-addons-update";
import axios from "axios";
const mapStyle = {
	paddingBottom: "10px",
	height: "100%"
};
var count = 0;
var data = [];
const gradient = [
	"rgba(0, 255, 255, 0)",
	"rgba(0, 255, 255, 1)",
	"rgba(0, 191, 255, 1)",
	"rgba(0, 127, 255, 1)",
	"rgba(0, 63, 255, 1)",
	"rgba(0, 0, 255, 1)",
	"rgba(0, 0, 223, 1)",
	"rgba(0, 0, 191, 1)",
	"rgba(0, 0, 159, 1)",
	"rgba(0, 0, 127, 1)",
	"rgba(63, 0, 91, 1)",
	"rgba(127, 0, 63, 1)",
	"rgba(191, 0, 31, 1)",
	"rgba(255, 0, 0, 1000)"
];
export class MapContainer extends React.Component {
	sendData = () => {
		this.props.parentCallBack(this.state.markers);
	};
	state = { markers: [], mapCovid: [] };

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

	componentDidMount() {
		this._asyncRequest = axios.get("https://corona.lmao.ninja/v2/countries").then((response) => {
			this._asyncRequest = null;
			data = response;
			this.iniciateMarkers();
		});
	}

	iniciateMarkers() {
		if (!this.state.mapCovid.length > 0 && data.data.length > 0 && count === 0) {
			count = 1;
			let mapCovid = this.state.mapCovid;
			const geoJson = {
				type: "FeatureCollection",
				features: data.data.map((country = {}) => {
					const { countryInfo = {} } = country;
					const { lat, long: lng } = countryInfo;

					mapCovid = update(mapCovid, {
						$push: [
							{
								lat: lat,
								lng: lng,
								weight: country.cases,
								options: {
									radius: 20,
									opacity: 0.6
								}
							}
						]
					});
				})
			};

			this.setState({ mapCovid });
			this.sendData();
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
					key: this.state.markers.length
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
		for (var i = 0; i < markers2.length; i++) {
			if (markers2[i].key === props.index) {
				markers2.splice(i, 1);
				this.setState({ markers2 });
				this.sendData();
			}
		}
	};

	render() {
		this.getLocation();
		if (this.state.mapCovid.length > 0) {
			return (
				<Map
					google={this.props.google}
					zoom={5}
					style={mapStyle}
					heatmapLibrary={true}
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
					<HeatMap gradient={gradient} opacity={1} positions={this.state.mapCovid} radius={15} />
					{this.state.markers.map((marker) => {
						return (
							<Marker
								key={marker.position.lat + marker.position.lng}
								position={{ lat: marker.position.lat, lng: marker.position.lng }}
								icon={"http://maps.google.com/mapfiles/ms/icons/blue.png"}
								markersList={this.state.markers}
								index={marker.key}
								onClick={this.onMarkerClick}
							/>
						);
					})}

					<Polyline path={this.draw()} strokeColor="#01C9EA" strokeOpacity={0.8} strokeWeight={2} />
				</Map>
			);
		} else {
			return <Loader absolute />;
		}
	}
}

export default GoogleApiWrapper({
	apiKey: "AIzaSyB3kcMOsEbg2unbt5yGvqw4HxNlSLE-U00",
	libraries: [ "visualization" ]
})(MapContainer);

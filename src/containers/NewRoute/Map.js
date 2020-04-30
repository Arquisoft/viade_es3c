import { Map, GoogleApiWrapper, Marker, Polyline, HeatMap, InfoWindow } from "google-maps-react";
import * as Papa from "papaparse";
import { MarkerClusterer } from "@react-google-maps/api";
import React from "react";
import update from "react-addons-update";
import axios from "axios";
const mapStyle = {
	paddingBottom: "10px",
	height: "100%"
};

const infoWindowStyle = {
	display: "block",
	fontSize: "10px",
	margin: 0
};

var locations = [
	{ lat: -31.56391, lng: 147.154312 },
	{ lat: -33.718234, lng: 150.363181 },
	{ lat: -33.727111, lng: 150.371124 },
	{ lat: -33.848588, lng: 151.209834 },
	{ lat: -33.851702, lng: 151.216968 },
	{ lat: -34.671264, lng: 150.863657 },
	{ lat: -35.304724, lng: 148.662905 },
	{ lat: -36.817685, lng: 175.699196 },
	{ lat: -36.828611, lng: 175.790222 },
	{ lat: -37.75, lng: 145.116667 },
	{ lat: -37.759859, lng: 145.128708 },
	{ lat: -37.765015, lng: 145.133858 },
	{ lat: -37.770104, lng: 145.143299 },
	{ lat: -37.7737, lng: 145.145187 },
	{ lat: -37.774785, lng: 145.137978 },
	{ lat: -37.819616, lng: 144.968119 },
	{ lat: -38.330766, lng: 144.695692 },
	{ lat: -39.927193, lng: 175.053218 },
	{ lat: -41.330162, lng: 174.865694 },
	{ lat: -42.734358, lng: 147.439506 },
	{ lat: -42.734358, lng: 147.501315 },
	{ lat: -42.735258, lng: 147.438 },
	{ lat: -43.999792, lng: 170.463352 }
];

var count = 0;
var data = [];
var gradient = [
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
	"rgba(255, 0, 0, 1)"
];
export class MapContainer extends React.Component {
	sendData = () => {
		this.props.parentCallBack(this.state.markers);
	};
	state = { markers: [], mapCovid: [], isHeatVisible: false, activeMarker: null, showInfoWindow: false };

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
		this._asyncRequest = axios
			.get("https://raw.githubusercontent.com/microsoft/Bing-COVID-19-Data/master/data/Bing-COVID19-Data.csv")
			.then((response) => {
				this._asyncRequest = null;
				data = Papa.parse(response.data);
				data = data.data;
				console.log(data);
				this.setState({ mapCovid: data });
				//this.iniciateMarkers();
			});
	}

	iniciateMarkers() {
		if (!this.state.mapCovid.length > 0 && data.data.length > 0 && count === 0) {
			count = 1;
			let mapCovid = this.state.mapCovid;
			// eslint-disable-next-line
			const geoJson = {
				type: "FeatureCollection",
				// eslint-disable-next-line
				features: data.data.map((country = {}) => {
					mapCovid = update(mapCovid, {
						$push: [
							{
								lat: country[8],
								lng: country[9],

								key: this.state.markers.length
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

	handleToggle = () => {
		this.setState({ isHeatVisible: !this.state.isHeatVisible });
	};
	handleMouseOver = (props, marker, e) => {
		this.setState({
			activeMarker: marker,
			showInfoWindow: true
		});
	};

	handleMouseExit = (props, marker, e) => {
		this.setState({
			activeMarker: null,
			showInfoWindow: false
		});
	};

	render() {
		this.getLocation();

		return (
			<Map
				google={this.props.google}
				zoom={5}
				minZoom={3}
				style={mapStyle}
				heatmapLibrary={true}
				onClick={this.clickPoint}
				center={this.state.center}
				gestureHandling={"cooperative"}
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
				<div id="floating-panel">
					<button id={"buttonCovid"} onClick={this.handleToggle}>
						{" "}
						Covid heatMap
					</button>
				</div>

				<MarkerClusterer>
					{locations.map((marker) => {
						return <Marker key={marker.lat + marker.lat} position={{ lat: marker.lat, lng: marker.lng }} />;
					})}
				</MarkerClusterer>

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
	}
}

export default GoogleApiWrapper({
	apiKey: "AIzaSyB3kcMOsEbg2unbt5yGvqw4HxNlSLE-U00",
	libraries: [ "visualization" ]
})(MapContainer);

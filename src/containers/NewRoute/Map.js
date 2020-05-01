import { Map, GoogleApiWrapper, Marker, Polyline, HeatMap, InfoWindow } from "google-maps-react";
import * as Papa from "papaparse";
import React from "react";
import update from "react-addons-update";
import axios from "axios";
import { Loader } from "@util-components";

const mapStyle = {
	paddingBottom: "10px",
	height: "100%"
};

const infoWindowStyle = {
	display: "block",
	fontSize: "10px",
	margin: 0
};
var heatMap = [];

var count = 0;
var data = [];
var dataActualizada = [];
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
	state = {
		markers: [],
		mapCovid: [],
		currentZoom: null,
		isHeatVisible: false,
		activeMarker: null,
		showInfoWindow: false
	};

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
				data = null;
				this._asyncRequest = null;
				var config = {
					header: true
				};
				data = Papa.parse(response.data, config);
				data = data.data;

				var region = this.groupByArray(data, "AdminRegion2");

				region.map((country = {}) => {
					dataActualizada.push(country.values[country.values.length - 1]);
				});

				var region2 = this.groupByArray(data, "AdminRegion1");
				region2.map((country = {}) => {
					dataActualizada.push(country.values[country.values.length - 1]);
				});

				var pais = this.groupByArray(data, "Country_Region");
				pais.map((country = {}) => {
					dataActualizada.push(country.values[country.values.length - 1]);
				});

				this.iniciateMarkers();
			});
	}

	componentWillUnmount() {
		dataActualizada = [];
		data = [];
		heatMap = [];
		count = 0;
	}

	groupByArray(xs, key) {
		return xs.reduce(function(rv, x) {
			let v = key instanceof Function ? key(x) : x[key];
			let el = rv.find((r) => r && r.key === v);
			if (el) {
				el.values.push(x);
			} else {
				rv.push({ key: v, values: [ x ] });
			}
			return rv;
		}, []);
	}

	iniciateMarkers() {
		if (!this.state.mapCovid.length > 0 && dataActualizada.length > 0 && count === 0) {
			let mapCovid = this.state.mapCovid;
			// eslint-disable-next-line
			const geoJson = {
				type: "FeatureCollection",
				// eslint-disable-next-line
				features: dataActualizada.map((country = {}) => {
					if (country.Latitude && country.Longitude) {
						mapCovid = update(mapCovid, {
							$push: [
								{
									lat: country.Latitude,
									lng: country.Longitude,
									recuperados: country.Recovered,
									muertes: country.Deaths,
									casos: country.Confirmed,
									country_p: country.Country_Region,
									region: country.AdminRegion1,
									city: country.AdminRegion2,
									updated: country.Updated
								}
							]
						});
					}
				})
			};
			this.setState({ mapCovid });
			count = 1;

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

	handleZoom = (props, map, e) => {
		this.setState({
			currentZoom: map.zoom
		});
		console.log(this.state.currentZoom);
	};

	close = () => {
		this.setState({
			activeMarker: null,
			showInfoWindow: false
		});
	};

	render() {
		this.getLocation();

		heatMap = (
			<HeatMap
				visible={this.state.isHeatVisible}
				gradient={gradient}
				opacity={1}
				positions={this.state.mapCovid}
				radius={20}
				center={this.state.center}
				heatmapMode={"POINTS_WEIGHT"}
			/>
		);
		return (
			<Map
				google={this.props.google}
				zoom={5}
				minZoom={3}
				onZoomChanged={this.handleZoom}
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
				{this.state.isHeatVisible ? heatMap : null}

				{this.state.mapCovid.map((point) => {
					return (
						<Marker
							position={{ lat: point.lat, lng: point.lng }}
							c={point}
							cursor={"hand"}
							icon={"http://maps.google.com/mapfiles/ms/icons/red.png"}
							visible={this.state.currentZoom >= 8 && this.isHeatVisible}
							onMouseover={this.handleMouseOver}
							key={point.key}
							tracksViewChanges={false}
						/>
					);
				})}
				{this.state.showInfoWindow ? (
					<InfoWindow
						marker={this.state.activeMarker}
						visible={this.state.showInfoWindow}
						maxWidth={120}
						onClose={this.close}
					>
						<h5 style={infoWindowStyle}>{this.state.activeMarker.c.country_p}</h5>
						<h5 style={infoWindowStyle}>{this.state.activeMarker.c.region}</h5>
						<h5 style={infoWindowStyle}>{this.state.activeMarker.c.city}</h5>
						<p style={infoWindowStyle}> Cases: {this.state.activeMarker.c.casos}</p>
						<p style={infoWindowStyle}> Deaths: {this.state.activeMarker.c.muertes}</p>
						<p style={infoWindowStyle}> Recovered: {this.state.activeMarker.c.recuperados}</p>
					</InfoWindow>
				) : null}

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

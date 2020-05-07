import { Point } from "../domain";

export class ParserFile {
	points = [];

	parserGeoJSON(file) {
		var geoObject = JSON.parse(file);
		var features;
		features = geoObject.features;
		if (features.length === 1) {
			if (features[0].geometry.type === "LineString") {
				var coordinates = features[0].geometry.coordinates;
				for (var i = 0; i < coordinates.length; i++) {
					this.points.push(new Point(coordinates[i][0], coordinates[i][1]));
				}
			}
		}
		return this.points;
	}

	parserGPX(file) {
		var parser = new DOMParser();
		var gpx = parser.parseFromString(file, "text/xml");
		var trkpts = gpx.getElementsByTagName("trkpt");
		trkpts = gpx.getElementsByTagName("rtept");
		for (var i = 0; i < trkpts.length; i++) {
			let lat = parseFloat(trkpts[i].getAttribute("lat"));
			let lng = parseFloat(trkpts[i].getAttribute("lon"));
			this.points.push(new Point(lat, lng));
		}
		return this.points;
	}
}

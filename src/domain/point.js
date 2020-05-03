export default class Point {
	webId = "";

	/**
   * Constructor class point
   *
   */
	constructor(latitude, longitude, altitude) {
		this.longitude = longitude;
		this.latitude = latitude;
	}

	getIdPoint() {
		return `${this.longitude}_${this.latitude}`;
	}
}

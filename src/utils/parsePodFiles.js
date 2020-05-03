import { Route, Point, Multimedia } from "domain";
import rutaShape from "@contexts/route-shape.json";
import mediaShape from "@contexts/media-shape.json";
import auth from "solid-auth-client";
import * as ldflexHelper from "./ldflex-helper";
import * as storageHelper from "./storage";
const routePath = process.env.REACT_APP_VIADE_ES3C_ROUTES_PATH;
const sharedPath = process.env.REACT_APP_VIADE_ES3C_SHARED_PATH;

const FC = require("solid-file-client");
const fc = new FC(auth);
const N3 = require("n3");

export const createRouteFromData = async (folder) => {
	let routes = [];
	while (routes.length < folder.length) {
		routes = [];
		for (const element of folder) {
			let quadStream = await fc.readFile(element.url);
			const turtleParser = new N3.Parser({ format: "Turtle" });
			let name,
				description,
				author,
				latitude,
				longitude = "";
			let points = [];
			let multimedia = [];
			// eslint-disable-next-line
			turtleParser.parse(quadStream, async (err, quad, prefixes) => {
				if (err) {
					throw err;
				}
				if (quad) {
					if (quad.predicate.value === storageHelper.getPredicate(rutaShape.shape[1], rutaShape)) {
						name = quad.object.value;
					} else if (quad.predicate.value === storageHelper.getPredicate(rutaShape.shape[2], rutaShape)) {
						description = quad.object.value;
					} else if (quad.predicate.value === storageHelper.getPredicate(rutaShape.shape[3], rutaShape)) {
						author = quad.object.value;
					} else if (quad.predicate.value === storageHelper.getPredicate(rutaShape.shape[5], rutaShape)) {
						longitude = quad.object.value;
					} else if (quad.predicate.value === storageHelper.getPredicate(rutaShape.shape[7], rutaShape)) {
						let urlFile = quad.object.value;
						var quadStreamMedia = await fc.readFile(quad.object.value);
						const turtleParserMedia = new N3.Parser({ format: "Turtle" });
						let url,
							date,
							authorMedia = "";
						turtleParserMedia.parse(quadStreamMedia, (err, quad, prefixes) => {
							if (err) {
								throw err;
							}
							if (quad) {
								if (
									quad.predicate.value === storageHelper.getPredicate(mediaShape.shape[0], mediaShape)
								) {
									url = quad.object.value;
								} else if (
									quad.predicate.value === storageHelper.getPredicate(mediaShape.shape[1], mediaShape)
								) {
									date = quad.object.value;
								} else if (
									quad.predicate.value === storageHelper.getPredicate(mediaShape.shape[2], mediaShape)
								) {
									authorMedia = quad.object.value;
								}
							} else if (quad === null) {
								let nameMedia = url.split("/")[6]; //TEMPORAL
								multimedia.push(new Multimedia(url, date, authorMedia, nameMedia, urlFile));
							}
						});
					} else if (quad.predicate.value === storageHelper.getPredicate(rutaShape.shape[6], rutaShape)) {
						latitude = quad.object.value;
					} else if (quad.predicate.value === storageHelper.getPredicate(rutaShape.shape[4], rutaShape)) {
						let point = new Point(latitude, longitude);
						points.push(point);
					}
				} else {
					let ruta = new Route(name, author, description, points, multimedia, quadStream);
					routes.push(ruta);
				}
			});
		}
	}
	return routes;
};

export const getRoutesFromPod = async (webId) => {
	var path = await storageHelper.getAppStorage(webId, routePath);
	const routesFolderExists = await ldflexHelper.resourceExists(path);
	if (!routesFolderExists) {
		return "EMPTY";
	} else {
		var folder = await fc.readFolder(path);
		if (folder.files.length <= 0) {
			return "EMPTY";
		} else {
			return await createRouteFromData(folder.files);
		}
	}
};

export const getRoutesSharedFromPod = async (webId) => {
	var path = await storageHelper.getAppStorage(webId, sharedPath);
	const routesFolderExists = await ldflexHelper.resourceExists(path);
	if (!routesFolderExists) {
		return "EMPTY";
	} else {
		var folder = await fc.readFolder(path);
		if (folder.files.length <= 0) {
			return "EMPTY";
		} else {
			return await createRouteFromData(folder.files);
		}
	}
};

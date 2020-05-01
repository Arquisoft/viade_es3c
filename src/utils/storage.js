import data from "@solid/query-ldflex";
import { AccessControlList } from "@inrupt/solid-react-components";
import * as ldflexHelper from "./ldflex-helper";
import * as permissionHelper from "./permissions";
import { resourceExists, createDoc, createDocument } from "./ldflex-helper";
import { errorToaster } from "@utils";
import routeShape from "@contexts/route-shape.json";
import mediaShape from "@contexts/media-shape.json";
const routePath = process.env.REACT_APP_VIADE_ES3C_ROUTES_PATH;
const mediaPath = process.env.REACT_APP_VIADE_ES3C_MEDIA_PATH;
const rawMediaPath = process.env.REACT_APP_VIADE_ES3C_RAWMEDIA_PATH;
const settingsPath = process.env.REACT_APP_VIADE_ES3C_SETTINGS_PATH;
const inboxPath = process.env.REACT_APP_VIADE_ES3C_INBOX_PATH;
const sharedPath = process.env.REACT_APP_VIADE_ES3C_SHARED_PATH;

const N3 = require("n3");
const { DataFactory } = N3;
const { namedNode, literal, defaultGraph, quad } = DataFactory;

/**
 * Helper function to check for the user's pod storage value. If it doesn't exist, we assume root of the pod
 * @returns {Promise<string>}
 */
export const getAppStorage = async (webId, appPath) => {
	const podStoragePath = await data[webId].storage;
	let podStoragePathValue = podStoragePath && podStoragePath.value.trim().length > 0 ? podStoragePath.value : "";

	// Make sure that the path ends in a / so it is recognized as a folder path
	if (podStoragePathValue && !podStoragePathValue.endsWith("/")) {
		podStoragePathValue = `${podStoragePathValue}/`;
	}

	// If there is no storage value from the pod, use webId as the backup, and append the application path from env
	if (!podStoragePathValue || podStoragePathValue.trim().length === 0) {
		return buildPathFromWebId(webId, appPath);
	}

	return `${podStoragePathValue}${appPath}`;
};
/**
 * Returns the content of the rdf file in Turtle format
 * @param path
 * @param route
 * @param routeShape
 * @returns {*}
 */
export const createRoute = (subject, mediaurl, route, routeShape) => {
	if (createInitialFiles) {
		const writer = new N3.Writer();
		const quads = [];
		quads.push(createQuadWithLiteral(subject, routeShape, 1, route.name));
		quads.push(createQuadWithLiteral(subject, routeShape, 2, route.description));
		quads.push(createQuadWithLiteral(subject, routeShape, 3, route.author));

		for (let i = 0; i < route.points.length; i++) {
			const point = quad(
				namedNode(subject),
				namedNode(getPredicate(routeShape.shape[4], routeShape)),
				writer.blank([
					{
						predicate: namedNode(getPredicate(routeShape.shape[5], routeShape)),
						object: literal(route.points[parseInt(i)].longitude)
					},
					{
						predicate: namedNode(getPredicate(routeShape.shape[6], routeShape)),
						object: literal(route.points[parseInt(i)].latitude)
					}
				])
			);
			quads.push(point);
		}

		if (route.multimedia.length > 0) {
			for (let j = 0; j < route.multimedia.length; j++) {
				quads.push(
					createQuadWithOutLiteral(
						subject,
						routeShape,
						7,
						mediaurl + route.multimedia[parseInt(j)].getIdMedia() + ".ttl"
					)
				);
			}
		}

		return writer.quadsToString(quads);
	}
};

export const createMedia = (subject, media, mediaShape) => {
	const writer = new N3.Writer();
	const quads = [];
	quads.push(createQuadWithOutLiteral(subject, mediaShape, 0, media.url));
	quads.push(createQuadWithLiteral(subject, mediaShape, 1, media.date));
	quads.push(createQuadWithLiteral(subject, mediaShape, 2, media.author));

	return writer.quadsToString(quads);
};

/**
 * Creates a quad (rdf triplet) with a node value
 * @param subject
 * @param routeShape
 * @param order
 * @param node
 * @returns {*}
 */
export const createQuadWithOutLiteral = (subject, routeShape, order, node) => {
	return quad(
		namedNode(subject),
		namedNode(getPredicate(routeShape.shape[parseInt(order)], routeShape)),
		namedNode(node),
		defaultGraph("Ruta")
	);
};
/**
 * Creates a quad (rdf triplet) with literal values
 * @param subject
 * @param routeShape
 * @param order
 * @param attribute
 * @returns {*}
 */
export const createQuadWithLiteral = (subject, routeShape, order, attribute) => {
	return quad(
		namedNode(subject),
		namedNode(getPredicate(routeShape.shape[parseInt(order)], routeShape)),
		literal(attribute),
		defaultGraph("Ruta")
	);
};

/**
 * Gets the predicate from the context shape file
 * @param field
 * @param routeShape
 * @returns {*}
 */
export const getPredicate = (field, routeShape) => {
	const prefix = routeShape["@context"][field.prefix];
	return `${prefix}${field.predicate}`;
};
/**
 * Creates a valid string that represents the application path. This is the
 * default value if no storage predicate is discovered
 * @param webId
 * @param path
 * @returns {*}
 */
export const buildPathFromWebId = (webId, path) => {
	if (!webId) return false;
	const domain = new URL(typeof webId === "object" ? webId.webId : webId).origin;
	return `${domain}/${path}`;
};

/**
 *  Check and create the route file
 * @param folderPath
 * @returns {Promise<boolean>} Returns whether or not there were any errors during the creation process
 */
export const addRoute = async (webId, route) => {
	try {
		// First, check if we have WRITE permission for the app
		const hasWritePermission = await permissionHelper.checkSpecificAppPermission(
			webId,
			AccessControlList.MODES.WRITE
		);

		// If we do not have Write permission, there's nothing we can do here
		if (!hasWritePermission) return;

		// Get the default app storage location from the user's pod and append our path to it
		const viadeUrl = await getAppStorage(webId, routePath);
		const mediaurl = await getAppStorage(webId, mediaPath);

		// Set up various paths relative to the viade URL
		const routeFilePath = `${viadeUrl}` + route.getIdRoute() + `.ttl`;

		//create the body of the rdf document with the route content we are going to upload
		const body = createRoute(routeFilePath, mediaurl, route, routeShape);

		// Check if route file exists, if not then create it.
		const routeFileExists = await resourceExists(routeFilePath);
		if (!routeFileExists) {
			const newDocument = await ldflexHelper.createDocumentWithTurtle(routeFilePath, body);
			if (!newDocument) {
				return {
					added: false
				};
			}
		}
		return true;
	} catch (error) {
		errorToaster(error.message, "Error");
		return false;
	}
};

export const addMedia = async (webId, media) => {
	try {
		// First, check if we have WRITE permission for the app
		const hasWritePermission = await permissionHelper.checkSpecificAppPermission(
			webId,
			AccessControlList.MODES.WRITE
		);
		// If we do not have Write permission, there's nothing we can do here
		if (!hasWritePermission) return;

		// Get the default app storage location from the user's pod and append our path to it
		const viadeUrl = await getAppStorage(webId, mediaPath);

		// Set up various paths relative to the viade URL
		const routeFilePath = `${viadeUrl}` + media.getIdMedia() + `.ttl`;

		//create the body of the rdf document with the route content we are going to upload
		const body = createMedia(routeFilePath, media, mediaShape);

		// Check if route file exists, if not then create it.
		const routeFileExists = await resourceExists(routeFilePath);
		if (!routeFileExists) {
			const newDocument = await ldflexHelper.createDocumentWithTurtle(routeFilePath, body);
			if (!newDocument) {
				return {
					added: false
				};
			}
		}
		return true;
	} catch (error) {
		errorToaster(error.message, "Error");
		return false;
	}
};

/**
 *  Check and create the initial app files and folders
 * @param folderPath
 * @returns {Promise<boolean>} Returns whether or not there were any errors during the creation process
 */
export const createInitialFiles = async (webId) => {
	try {
		// First, check if we have WRITE permission for the app
		const hasWritePermission = await permissionHelper.checkSpecificAppPermission(
			webId,
			AccessControlList.MODES.WRITE
		);

		// If we do not have Write permission, there's nothing we can do here
		if (!hasWritePermission) return;

		// Get the default app storage location from the user's pod and append our path to it
		const routesUrl = await getAppStorage(webId, routePath);
		const mediaUrl = await getAppStorage(webId, mediaPath);
		const rawMediaUrl = await getAppStorage(webId, rawMediaPath);
		const settingsUrl = await getAppStorage(webId, settingsPath);
		const settingsInboxUrl = await getAppStorage(webId, inboxPath);
		const sharedUrl = await getAppStorage(webId, sharedPath);

		// Set up various paths relative to the viade URL
		const dataFilePath = `${settingsUrl}data.ttl`;
		const settingsFilePath = `${settingsUrl}settings.ttl`;
		const settingsInboxFilePath = `${settingsInboxUrl}settings.ttl`;

		// Check if the viade folder exists, if not then create it.
		const routesFolderExists = await resourceExists(routesUrl);
		if (!routesFolderExists) {
			await createDoc(data, {
				method: "PUT",
				headers: {
					"Content-Type": "text/turtle"
				}
			});
		}
		// Check if the viade folder exists, if not then create it.
		const mediaFolderExists = await resourceExists(mediaUrl);
		if (!mediaFolderExists) {
			await createDoc(data, {
				method: "PUT",
				headers: {
					"Content-Type": "text/turtle"
				}
			});
		}
		// Check if the viade folder exists, if not then create it.
		const rawMediaFolderExists = await resourceExists(rawMediaUrl);
		if (!rawMediaFolderExists) {
			await createDoc(data, {
				method: "PUT",
				headers: {
					"Content-Type": "text/turtle"
				}
			});
		}

		// Check if the viade folder exists, if not then create it.
		const settingsFolderExists = await resourceExists(settingsUrl);
		if (!settingsFolderExists) {
			await createDoc(data, {
				method: "PUT",
				headers: {
					"Content-Type": "text/turtle"
				}
			});
		}

		// Check if the viade folder exists, if not then create it.
		const sharedFolderExists = await resourceExists(sharedUrl);
		if (!sharedFolderExists) {
			await createDoc(data, {
				method: "PUT",
				headers: {
					"Content-Type": "text/turtle"
				}
			});
		}
		// Check if data file exists, if not then create it.
		const dataFileExists = await resourceExists(dataFilePath);
		if (!dataFileExists) {
			await createDocument(dataFilePath);
		}

		// Check if the settings file exists, if not then create it.
		const settingsFileExists = await resourceExists(settingsFilePath);
		if (!settingsFileExists) {
			await createDocument(settingsFilePath);
		}

		const settingsInboxFileExists = await resourceExists(settingsInboxFilePath);
		if (!settingsInboxFileExists) {
			await createDocument(settingsInboxFilePath);
		}

		return true;
	} catch (error) {
		errorToaster(error.message, "Error");
		return false;
	}
};

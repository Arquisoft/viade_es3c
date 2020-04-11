import { storageHelper, parsePodFiles } from "@utils";

export const iniciateStructure = async (webId) => {
	return await storageHelper.createInitialFiles(webId);
};

export const addRoute = async (route, webId) => {
	if (route.multimedia.length > 0) {
		for (let i = 0; i < route.multimedia.length; i++) {
			addMedia(route.multimedia[i], webId);
		}
	}
	return await storageHelper.addRoute(webId, route);
};

export const readRoutesFromPod = async (webId) => {
	let routes = await parsePodFiles.getRoutesFromPod(webId);
	return routes;
};

export const addMedia = async (media, webId) => {
	return await storageHelper.addMedia(webId, media);
};

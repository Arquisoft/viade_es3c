import {storageHelper, parsePodFiles} from '@utils';

export const iniciateStructure = async (webId) => {
    return await storageHelper.createInitialFiles(webId);
}

export const addRoute = async (ruta, webId) => {
    return await storageHelper.addRoute(webId, ruta);
}

export const readRoutesFromPod = async (webId) => {
     return await parsePodFiles.getRoutesFromPod(webId); 
}







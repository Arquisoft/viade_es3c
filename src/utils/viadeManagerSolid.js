import {storageHelper} from '@utils';
import{parseFile, getRoutesFromPod, verRutas} from './parsePodFiles';

export const iniciateStructure = async (webId) => {
    return await storageHelper.createInitialFiles(webId);
}

export const addRoute = async (ruta, webId) => {
    readRoute();
    return await storageHelper.addRoute(webId, ruta);
}

export const readRoute = async () => {
    return await getRoutesFromPod(); 
}







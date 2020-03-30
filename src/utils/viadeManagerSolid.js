import {storageHelper} from '@utils';
import{parseFile, getRoutesFromPod, verRutas} from './parsePodFiles';

export const iniciateStructure = async (webId) => {
    return await storageHelper.createInitialFiles(webId);
}

export const addRoute = async (route, webId) => {
    return await storageHelper.addRoute(webId, route);
}

export const readRoutesFromPod = async () => {
    return await getRoutesFromPod(); 
}







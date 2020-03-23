import {storageHelper} from '@utils';


export const iniciateStructure = async (webId) => {
    return await storageHelper.createInitialFiles(webId);
}

export const addRoute = async (route, webId) => {
    return await storageHelper.addRoute(webId, route);
}







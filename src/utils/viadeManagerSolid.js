import {storageHelper} from '@utils';



const N3 = require('n3');


export const iniciateStructure = async (webId) => {
    return await storageHelper.createInitialFiles(webId);
}

export const addRoute = async (webId) => {
    return await storageHelper.createRoute(webId);
}







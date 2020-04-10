import {storageHelper, parsePodFiles,notification} from '@utils';


export const iniciateStructure = async (webId) => {
    return await storageHelper.createInitialFiles(webId);
}


export const addRoute = async (route, webId) => {
    return await storageHelper.addRoute(webId, route);
}

export const readRoutesFromPod = async (webId) => {
     return await parsePodFiles.getRoutesFromPod(webId); 
}

export const addMedia= async (media, webId)=>{
    return await storageHelper.addMedia(webId, media);
}
export const Invitation = async(route, webId) =>{
    return await notification.handleSave(route, webId);
}







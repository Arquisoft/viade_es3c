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

export const generateInvitation = async(route, webId, author) =>{
    return await notification.addRoute(author, route, webId);
}

export const Invitation = async(author, route, webId) =>{
    return await notification.createNotification(author, route, webId);
}







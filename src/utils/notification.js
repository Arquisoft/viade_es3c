import {NotificationTypes, useNotification} from '@inrupt/solid-react-components';
import data from "@solid/query-ldflex";
import "./styles.css";
import {  ldflexHelper } from "@utils";
const appPath = process.env.REACT_APP_VIADE_ES3C_PATH;


/* export const sendNotification = async (friend, content, createNotification, to) => {
  try {
    if (to) {
      return createNotification(content, to);
    }
    /**
     * If the friend doesn't have an inbox, show an error
     */
  /*   throw new Error('Error: Your friend does not have an available inbox');
  } catch (error) {
    throw new Error(error);
  }
}; */ 

export const buildPathFromWebId = (webId, path) => {
  if (!webId) return false;
  const domain = new URL(typeof webId === "object" ? webId.webId : webId)
    .origin;
  return `${domain}/${path}`;
};

export const findUserInboxes = async paths => {
  try {
    let inboxes = [];

    for await (const path of paths) {
      const { path: currentPath } = path;
      const inbox = await ldflexHelper.discoverInbox(currentPath);

      if (inbox) {
        inboxes = [...inboxes, { ...path, path: inbox }];
      }
    }


    return inboxes;
  } catch (error) {
    throw new Error(error);
  }
};

export const getDefaultInbox = (inboxes, inbox1, inbox2) =>
  inboxes.find(inbox => inbox.name === inbox1) || inboxes.find(inbox => inbox.name === inbox2);

/**
 * Helper function to check for the user's pod storage value. If it doesn't exist, we assume root of the pod
 * @returns {Promise<string>}
 */
export const getAppStorage = async webId => {
  const podStoragePath = await data[webId].storage;
  let podStoragePathValue =
    podStoragePath && podStoragePath.value.trim().length > 0
      ? podStoragePath.value
      : "";

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


export const crearNotificacion = (author, route, webId) => {
  //const axios = require("axios");
  
const { invite } = require("./invite");
//const { fetch_inbox } = require("./discover-inbox");

// Get the default app storage location from the user's pod and append our path to it
const viadeUrl =  getAppStorage(webId);


// Set up various paths relative to the viade URL
const routeFilePath = `${viadeUrl}` + route.getIdRoute() + `.ttl`;

// Let's assume that we know the IRI of the invitee's calendar
const calendar_iri = "https://uo246355.solid.community/profile/card#me"

const invitation = invite(webId,routeFilePath);
// const store = $rdf.graph();
//const fetcher = new $rdf.Fetcher(store, timeout)

// First, fetch the inbox...
/* fetch_inbox(calendar_iri)
  .then(inbox => {
    // ...and then perform a POST to the target inbox to send
    // the invite defined in invite.js
    axios({
      method: "post",
      url: inbox,
      data: invitation,
      headers: {
        "Content-type": "text/turtle",
        Slug: "Notification5"
      }
    })
      })
      .catch(error => {
        console.log(error);
      });
  //alert("Llegamos al final")
  return true;
} */

let cadena = null;
//let friendWebID = null;
function createNotification() {
  return useNotification(cadena);
} 

async function sendNotification(content, to, type, license) {
  
  try {
      await createNotification(content, to, type, license);
  } catch (error) {
      console.log(error);
      alert('Error: RouteConst > sendNotification');
  }
}

/* export const handleSave = async (route,friendWebID) => {
  try {
      const contentNotif = {
          title: "Route share",
          summary: "Prueba 1",
          actor: cadena,
          object: "https://uo246355.solid.community/private/viade/Prueba%2024_uo246355.ttl",
          target: friendWebID
      };
      publish(sendNotification, contentNotif, friendWebID, NotificationTypes.OFFER);
  } catch (error) {
      console.log(error);
      alert("Could not share the route");
  }
} */

const publish = async (createNotification, content, webId, type) => {
  try {
      type = type || NotificationTypes.ANNOUNCE;

      const license = 'https://creativecommons.org/licenses/by-sa/4.0/';

      const inboxes = await findUserInboxes([
          {path: webId, name: 'Global'}
      ]);
      if (inboxes.length === 0)
          return false;
      const to = getDefaultInbox(inboxes, 'Global');
      if (to) {

          await createNotification({
              title: content.title,
              summary: content.summary,
              actor: content.actor,
              object: content.object,
              target: content.target
          }, to.path, type, license);
      }
      return true;
  } catch (e) {
      console.error(e);
      return false;
  }
}
}
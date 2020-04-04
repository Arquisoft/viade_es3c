
import data from "@solid/query-ldflex";
import "./styles.css";
import {  ldflexHelper } from "@utils";
const appPath = process.env.REACT_APP_VIADE_ES3C_PATH;


export const sendNotification = async (friend, content, createNotification, to) => {
  try {
    if (to) {
      return createNotification(content, to);
    }
    /**
     * If the friend doesn't have an inbox, show an error
     */
    throw new Error('Error: Your friend does not have an available inbox');
  } catch (error) {
    throw new Error(error);
  }
};

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


export const createNotification = (author, route, webId) => {
  const axios = require("axios");
  
const { invite } = require("./invite");
const { fetch_inbox } = require("./discover-inbox");

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
fetch_inbox(calendar_iri)
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
  alert("Llegamos al final")
  return true;
}

export const invite = (author, route) =>{ 
  const  inv = `@prefix inv: <>.
  @prefix as: <https://www.w3.org/ns/activitystreams#>.
  @prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#>.
  @prefix xsd: <http://www.w3.org/2001/XMLSchema#>.
  inv: a as:Notification;
      rdfs:label "Notification";
      rdfs:comment ` + author + `" has share their route with you";
      as:object <` + route + `>.
  `;
  alert("estamos en la invitacion");
  return inv;
  };


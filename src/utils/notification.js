

import "./styles.css";
import data from "@solid/query-ldflex";
import { AccessControlList } from "@inrupt/solid-react-components";
import { resourceExists, createDoc, createDocument } from "./ldflex-helper";
import {
  errorToaster,
  permissionHelper,
  ldflexHelper
} from "@utils";
import routeShape from "@contexts/route-shape.json";

const appPath = process.env.REACT_APP_VIADE_ES3C_PATH;
const N3 = require("n3");
const { DataFactory } = N3;
const { namedNode, literal, defaultGraph, quad } = DataFactory;

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




export const createNotification = () => {
  const axios = require("axios");
  
const { invite } = require("./invite");
const { fetch_inbox } = require("./discover-inbox");

// Let's assume that we know the IRI of the invitee's calendar
const calendar_iri = "https://uo246355.solid.community/";

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
      data: invite,
      headers: {
        "Content-type": "text/turtle",
        Slug: "We gonna parteyy"
      }
    })
      .then(response => {
        console.log(response.headers);
        if (response.status === 201) {
          document.getElementById("app").innerHTML = `
        <h1>Notification sent</h1>
        <div>
          Check the inbox of ${calendar_iri}: ${
            response.headers.location
          } has been created
        </div>
        `;
        }
      })
      .catch(error => {
        console.log(error);
      });
  })
  .catch(error => {
    console.log(error);
  });
  return true;
}

export const addRoute = async (webId, route) => {
  try {
    // First, check if we have WRITE permission for the app
    const hasWritePermission = await permissionHelper.checkSpecificAppPermission(
      webId,
      AccessControlList.MODES.WRITE
    );
    // If we do not have Write permission, there's nothing we can do here
    if (!hasWritePermission) return;

    const axios = require("axios");
  
const { invite } = require("./invite");

    // Get the default app storage location from the user's pod and append our path to it
    const viadeUrl = "https://uo246355.solid.community/inbox/"

    // Set up various paths relative to the viade URL
    const routeFilePath = `${viadeUrl}` + route.getIdRoute() + `.ttl`;

    //create the body of the rdf document with the route content we are going to upload
    const body  = axios({
      method: "post",
      url: viadeUrl,
      data: invite,
      headers: {
        "Content-type": "text/turtle",
        Slug: "We gonna parteyy"
      }})

    // Check if route file exists, if not then create it. 
    const routeFileExists = await resourceExists(routeFilePath);
    if (!routeFileExists) {
      const newDocument = await ldflexHelper.createDocumentWithTurtle(
        routeFilePath,
        body
      );
      if (!newDocument) {
        return {
          added: false
        };
      }
    }
    return true;
  } catch (error) {
    errorToaster(error.message, "Error");
    return false;
  }
};

/**
 * Returns the content of the rdf file in Turtle format
 * @param path
 * @param route
 * @param routeShape
 * @returns {*}
 */
export const createRoute = (subject, route, routeShape) => {
  if (createInitialFiles) {
    const writer = new N3.Writer();
    const quads =[];
    quads.push(createQuadWithLiteral(subject, routeShape, 1, route.name));
    quads.push(createQuadWithLiteral(subject, routeShape, 2, route.description));
    quads.push(createQuadWithLiteral(subject, routeShape, 3, route.author));

    for (let i = 0; i < route.points.length; i++) {
      const point = quad(namedNode(subject),
        namedNode(getPredicate(routeShape.shape[4], routeShape)),
        writer.blank([{
          predicate: namedNode(getPredicate(routeShape.shape[5], routeShape)),
          object: literal(route.points[i].longitude),
        }, {
          predicate: namedNode(getPredicate(routeShape.shape[6], routeShape)),
          object: literal(route.points[i].latitude),
        }]));
      quads.push(point);
    }

    return writer.quadsToString(quads);
  }
};
/**
 * Creates a quad (rdf triplet) with a node value
 * @param subject
 * @param routeShape
 * @param order
 * @param node
 * @returns {*}
 */
export const createQuadWithOutLiteral = (subject, routeShape, order, node) => {
  return quad(
    namedNode(subject),
    namedNode(getPredicate(routeShape.shape[order], routeShape)),
    namedNode(node),
    defaultGraph("Ruta")
  );
};
/**
 * Creates a quad (rdf triplet) with literal values
 * @param subject
 * @param routeShape
 * @param order
 * @param attribute
 * @returns {*}
 */
export const createQuadWithLiteral = (subject, routeShape, order, attribute) => {
  return quad(
    namedNode(subject),
    namedNode(getPredicate(routeShape.shape[order], routeShape)),
    literal(attribute),
    defaultGraph("Ruta")
  );
};


/**
 * Gets the predicate from the context shape file
 * @param field
 * @param routeShape
 * @returns {*}
 */
export const getPredicate = (field, routeShape) => {
  const prefix = routeShape["@context"][field.prefix];
  return `${prefix}${field.predicate}`;
};
/**
 * Creates a valid string that represents the application path. This is the
 * default value if no storage predicate is discovered
 * @param webId
 * @param path
 * @returns {*}
 */
export const buildPathFromWebId = (webId, path) => {
  if (!webId) return false;
  const domain = new URL(typeof webId === "object" ? webId.webId : webId)
    .origin;
  return `${domain}/${path}`;
};

export const createInitialFiles = async webId => {
  try {
    // First, check if we have WRITE permission for the app
    const hasWritePermission = await permissionHelper.checkSpecificAppPermission(
      webId,
      AccessControlList.MODES.WRITE
    );

    // If we do not have Write permission, there's nothing we can do here
    if (!hasWritePermission) return;

    // Get the default app storage location from the user's pod and append our path to it
    const viadeUrl = await getAppStorage(webId);
    // Set up various paths relative to the viade URL
    const dataFilePath = `${viadeUrl}data.ttl`;
    const settingsFilePath = `${viadeUrl}settings.ttl`;

    // Check if the viade folder exists, if not then create it.
    const viadeFolderExists = await resourceExists(viadeUrl);
    if (!viadeFolderExists) {
      await createDoc(data, {
        method: "PUT",
        headers: {
          "Content-Type": "text/turtle"
        }
      });
    }

    // Check if data file exists, if not then create it. 
    const dataFileExists = await resourceExists(dataFilePath);
    if (!dataFileExists) {
      await createDocument(dataFilePath);
    }

    // Check if the settings file exists, if not then create it.
    const settingsFileExists = await resourceExists(settingsFilePath);
    if (!settingsFileExists) {
      await createDocument(settingsFilePath);
    }

    return true;
  } catch (error) {
    errorToaster(error.message, "Error");
    return false;
  }
};
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

export const checkAndInitializeInbox = async () => "";

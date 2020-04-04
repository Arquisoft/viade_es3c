

import "./styles.css";
import {  ldflexHelper } from "@utils";



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
const calendar_iri = "https://uo246355.solid.community/profile/card#me"

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
      })
      .catch(error => {
        console.log(error);
      });
  alert("Llegamos al final")
  return true;
}

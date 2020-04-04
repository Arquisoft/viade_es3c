const axios = require("axios");
  
const { invite } = require("./invite");
const { fetch_inbox } = require("./discover-inbox");

// Let's assume that we know the IRI of the invitee's calendar
const calendar_iri = "https://uo246355.solid.community/inbox";

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
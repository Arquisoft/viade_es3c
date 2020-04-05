export const invite = (webID, route) =>{ 
    let author = webID.replace("https://","");
    author = author.replace(".solid.community/profile/card#me","");
    const  inv = `@prefix inv: <>.
    @prefix as: <https://www.w3.org/ns/activitystreams#>.
    @prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#>.
    @prefix xsd: <http://www.w3.org/2001/XMLSchema#>.
    inv: a as:Notification;
        rdfs:label "Notification";
        rdfs:comment "` + author +` has share their route with you";
        as:object <` + route + `>.
    `;
    alert("estamos en la invitacion");
    return inv;
    };
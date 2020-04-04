const invite = `
@prefix inv: <>.
@prefix as: <https://www.w3.org/ns/activitystreams#>.
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#>.
@prefix xsd: <http://www.w3.org/2001/XMLSchema#>.
inv: a as:Notification;
    rdfs:label "Notification";
    rdfs:comment "Someone has share their route with you".
`;
module.exports.invite = invite;

const invite = `
@prefix inv: <>.
@prefix as: <https://www.w3.org/ns/activitystreams#>.
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#>.
@prefix xsd: <http://www.w3.org/2001/XMLSchema#>.
inv: a as:Invite;
    rdfs:label "Invitation";
    rdfs:comment "You are invited to my book release party";
    as:object <https://jcaesar.solid.community/public/calendar/50BC/Martius/PartyAtCaesarPalace.ttl>.
`;
module.exports.invite = invite;

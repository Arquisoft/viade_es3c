const $rdf = require("rdflib");

const timeout = 3000;

const LDP = $rdf.Namespace("http://www.w3.org/ns/ldp#");

// Let's assume that we know the IRI of the invitee's calendar

function fetch_inbox(resource_iri) {
	return new Promise(function(resolve, reject) {
		const store = $rdf.graph();
		const fetcher = new $rdf.Fetcher(store, timeout);
		fetcher.nowOrWhenFetched(resource_iri, function(ok, body, xhr) {
			if (!ok) {
				reject("Oops, something happened and couldn't fetch data");
			} else {
				const resource = $rdf.sym(resource_iri);
				// Here, we look up the inbox from the calendar representation
				const inbox = store.any(resource, LDP("inbox"));
				resolve(inbox === undefined ? inbox : inbox.value);
			}
		});
	});
}

module.exports.fetch_inbox = fetch_inbox;

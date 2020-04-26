import ldflex from "@solid/query-ldflex";
import { foaf } from 'rdf-namespaces';
import { fetchDocument } from 'tripledoc';

class FriendsHelper {

    async addFriend(webId, friendWebId) {
        if(webId!==friendWebId && friendWebId!=="")
            await ldflex[webId].knows.add(ldflex[friendWebId]);
    }

    async deleteFriend(webId, friendWebId) {
        await ldflex[webId].knows.delete(ldflex[friendWebId]);
    }

    async findFriendsFor(webId) {
        const doc = await fetchDocument(webId);
        const me = doc.getSubject(webId);
        return me.getAllRefs(foaf.knows);
    }

    async getName(webId){
        const doc = await fetchDocument(webId);
        const me = doc.getSubject(webId);
        const name = me.getString(foaf.name);
        console.log('The name in this profile is:', name);
    }

}
const friendsHelper = new FriendsHelper();

export default friendsHelper;

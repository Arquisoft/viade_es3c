import ldflex from "@solid/query-ldflex";


class FriendsHelper {

    async addFriend(webId, friendWebId) {
        await ldflex[webId].knows.add(ldflex[friendWebId]);
    }

    async deleteFriend(webId, friendWebId) {
        await ldflex[webId].knows.delete(ldflex[friendWebId]);
    }

}
const friendsHelper = new FriendsHelper();

export default friendsHelper;

import ldflex from "@solid/query-ldflex";


class FriendsService {

    async addFriend(webId, friendWebId) {
        await ldflex[webId].knows.add(ldflex[friendWebId]);
    }

}
const friendsService = new FriendsService();

export default friendsService;

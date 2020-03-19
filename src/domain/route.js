export default class Route {
    webId = '';

    /**
     *
     * @param {String} name
     * @param {number} distance
     */
    constructor(name, distance) {
        this.name = name;
        this.distance = distance;
    }
    
    getIdentifier() {
        return `${this.name}`;
    }
}
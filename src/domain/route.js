export default class Route {
    webId = '';

    /**
     *
     * @param {String} name
     */
    constructor(name, longitude) {
        this.name = name;
        this.longitude = longitude;
       
    }
    
    getIdentifier() {
        return `${this.name}`;
    }
}
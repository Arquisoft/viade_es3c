export default class Route {
    webId = '';

    /**
     *
     * @param {String} name
     */
    constructor(name) {
        this.name = name;
       
    }
    
    getIdentifier() {
        return `${this.name}`;
    }
}
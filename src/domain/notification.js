export default class Notification {
    webId = "";
    read = false;
  
    /**
     *
     * @param {String} name
     */
    constructor(name, author, description, points,receptor) {
      this.name = name;
      this.author = author;
      this.receptor = receptor;
      this.description = description;
      this.points = points;
    }
  
    getIdRoute() {
      return `${this.name}_${this.author}`;
    }
  }
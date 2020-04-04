export default class Route {
  webId = "";
  points = [];

  /**
   *
   * @param {String} name
   */
  constructor(name, author, description, points, multimedia) {
    this.name = name;
    this.author = author;
    this.description = description;
    this.points = points;
    this.multimedia = multimedia;
  }

  getIdRoute() {
    return `${this.name}_${this.author}`;
  }
}

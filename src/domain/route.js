export default class Route {
  webId = "";

  /**
   *
   * @param {String} name
   */
  constructor(name, author, description, points) {
    this.name = name;
    this.author = author;
    this.description = description;
    this.points = points;
  }

  getIdRoute() {
    return `${this.name}_${this.author}`;
  }
}

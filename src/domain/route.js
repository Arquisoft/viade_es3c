export default class Route {
  webId = "";
  points = [];

  /**
   *
   * @param {String} name
   */
  constructor(name, author, description, points, mult) {
    this.name = name;
    this.author = author;
    this.description = description;
    this.points = points;
    this.mult = mult;
  }

  getIdRoute() {
    return `${this.name}_${this.author}`;
  }
}

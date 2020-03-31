export default class Route {
  webId = "";
  points = [];

  /**
   *
   * @param {String} name
   */
  constructor(name, author, description, points, mults) {
    this.name = name;
    this.author = author;
    this.description = description;
    this.points = points;
    this.mults = mults;
  }

  getIdRoute() {
    return `${this.name}_${this.author}`;
  }
}

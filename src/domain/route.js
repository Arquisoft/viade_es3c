export default class Route {
  webId = "";

  /**
   *
   * @param {String} name
   */
  constructor(name, author, description, latitude, longitude) {
    this.name = name;
    this.longitude = longitude;
    this.author = author;
    this.latitude = latitude;
    this.description = description;
  }  
}

import { v5 as uuidv5 } from "uuid";

export default class Route {
  webId = "";
  points = [];

  /**
   *
   * @param {String} name
   */
  constructor(name, author, description, points, multimedia, content) {
    this.name = name;
    this.author = author;
    this.description = description;
    this.points = points;
    this.multimedia = multimedia;
    this.content = content;
  }

  getIdRoute() {
    let mix = this.name + this.description + this.author;
    const MY_NAMESPACE = "10eadb41-c6bb-4874-b752-13465ec77185";
    return uuidv5(mix, MY_NAMESPACE);
  }

  calculateCenter() {
    let center = [];
    let lat;
    let lng;
    let c = this.points.length % 2;
    for (let i = 0; i < this.points.length; i++) {
      if (i === c) {
        lat = parseFloat(this.points[parseInt(i)].latitude);
        lng = parseFloat(this.points[parseInt(i)].longitude);
      }
    }
    center = [lat, lng];
    return center;
  }
}

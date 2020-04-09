export default class Route {
  webId = "";
  points = [];

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

  calculateCenter(){
    let center = [];
    let lat;
    let lng;
    let c = this.points.length%2;
    for (let i = 0; i < this.points.length; i++) {
        if(i=== c){
          lat = parseFloat(this.points[i].latitude);
          lng = parseFloat(this.points[i].longitude);
        }
    }
    center = [lat, lng];
    return center;
  } 
}

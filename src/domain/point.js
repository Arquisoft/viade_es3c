export default class Point {
    webId = "";
  
    /**
     *
     * 
     */
    constructor(latitude, longitude) {
      this.longitude = longitude;     
      this.latitude = latitude;
      
    }
  
    getIdPoint() {
      return `${this.longitude}_${this.latitude}`;
    }
  }
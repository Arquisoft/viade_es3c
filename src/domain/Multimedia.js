export default class Point {
    webId = "";
    
  
    /**
     * Constructor class point
     * 
     */
    constructor(name, encoding) {
      this.name = name;     
      this.encoding = encoding;
      
    }
  
    getIdPoint() {
      return `${this.name}_${this.encoding}`;
    }
  }
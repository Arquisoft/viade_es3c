export default class Multimedia {
    webId = "";
    
  
    constructor(name, encoding) {
      this.name = name;     
      this.encoding = encoding;
      
    }
  
    getIdPoint() {
      return `${this.name}_${this.encoding}`;
    }
  }
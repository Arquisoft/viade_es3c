import { v5 as uuidv5 } from 'uuid';

export default class Multimedia {
    webId = "";

    constructor(url, date, author, name) {  
      this.url=url;
      this.date=date;
      this.author=author; 
      this.name = name;     
    }
  
    getIdMedia() {     
      const MY_NAMESPACE = '10eadb41-c6bb-4874-b752-13465ec77185' ;   
      return uuidv5 (this.name, MY_NAMESPACE);
    }
  }

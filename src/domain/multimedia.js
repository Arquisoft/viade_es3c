export default class Multimedia {
    webId = "";
    
  
    constructor(url, date, author) {  
      this.url=url;
      this.date=date;
      this.author=author;      
    }
  
    getIdMedia() {
      return `${this.date}_${this.author}`;
    }
  }
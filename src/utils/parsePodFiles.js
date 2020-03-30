import { Route, Point } from "domain";

const auth = require('solid-auth-cli');
const FC   = require('solid-file-client');
const fc   = new FC( auth );
//const rdf = require('rdf-ext')
const N3 = require("n3");

var routes = [];

async function parseFile (urlFile){
  var quadStream = await fc.readFile(urlFile);  
  const turtleParser = new N3.Parser({ format: 'Turtle' })
  var name='';
  var description='';
  var author='';
  var points = [];
  var latitude = '';
  var longitude= '';
  turtleParser.parse(quadStream, (err, quad, prefixes) => {
    if (err) {
      throw err
    }
    if (quad) {
      if(quad.predicate.value === 'https://schema.org/name'){
          name = quad.object.value;
      }
      else if(quad.predicate.value === 'https://schema.org/description'){
          description = quad.object.value;
      }
      else if(quad.predicate.value === 'https://schema.org/author'){
          author = quad.object.value;
      }  
      else if(quad.predicate.value === 'https://www.w3.org/ns/pim/gpx#longitude'){
            longitude = quad.object.value;
        }
      else if(quad.predicate.value === 'https://www.w3.org/ns/pim/gpx#latitude'){
          latitude = quad.object.value;

      }
      else if(quad.predicate.value === 'https://www.w3.org/ns/pim/gpx#point'){
        let point = new Point(latitude, longitude);
        points.push(point);
      }
    }
  else{
    let route = new Route(name, author, description, points);
    routes.push(route);
  }
  })
  console.log(routes.length);
}

export const getRoutesFromPod = async ()=>{
    var folder = await fc.readFolder('https://taniamm.solid.community/public/viade');
    for (var i = 0; i < folder.files.length; i++) {
        parseFile(folder.files[i].url);
    }
    for(var i=0;i<routes.length;i++){
    console.log(routes[i].name);
    console.log(routes[i].description);
    console.log(routes[i].author);
    for(var j=0;j<routes[i].points.length;j++){
      console.log(routes[i].points[j].latitude);
      console.log(routes[i].points[j].longitude);
    }
  }
   return routes;
}
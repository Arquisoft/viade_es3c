const auth = require('solid-auth-cli');
const FC   = require('solid-file-client');
const fc   = new FC( auth );
const rdf = require('rdf-ext')
const N3 = require("n3");

export const parseFile =async (urlFile)=>{
  var quadStream = await fc.readFile(urlFile);  
  //console.log(quadStream);
  const turtleParser = new N3.Parser({ format: 'Turtle' })
  turtleParser.parse(quadStream, (err, quad, prefixes) => {
  if (err) {
    throw err
  }
  if (quad) {
    if(quad.predicate.value == 'https://schema.org/name'){
        let name = quad.object.value;
        console.log({ name});
    }
    if(quad.predicate.value == 'https://schema.org/description'){
        let description = quad.object.value;
        console.log({description});
    }
    if(quad.predicate.value == 'https://schema.org/author'){
        let author = quad.object.value;
        console.log({author});
    }  
    // let points = new Array();
    if(quad.predicate.value == 'https://www.w3.org/ns/pim/gpx#longitude'){
        let longitude = quad.object.value;
        console.log({longitude});
    }
    if(quad.predicate.value == 'https://www.w3.org/ns/pim/gpx#latitude'){
        let latitude = quad.object.value;
        console.log({latitude});
    }
  }
  else {
    console.log({ prefixes });
  }
})
}

export const getRoutesFromPod = async ()=>{
    let folder = await fc.readFolder('https://taniamato.solid.community/public/viade');
    for (var i = 0; i < folder.files.length; i++) {
        let f = parseFile(folder.files[i].url);
    }
}
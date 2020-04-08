import { Route, Point, Multimedia } from "domain";
import { storageHelper } from "@utils";
import rutaShape from "@contexts/route-shape.json";
import mediaShape from "@contexts/media-shape.json";
const routePath = process.env.REACT_APP_VIADE_ES3C_ROUTES_PATH;
const mediaPath = process.env.REACT_APP_VIADE_ES3C_MEDIA_PATH;
const auth = require("solid-auth-cli");
const FC = require("solid-file-client");
const fc = new FC(auth);
const N3 = require("n3");

export const getRoutesFromPod = async webId => {
  var routes = [];
  var path = await storageHelper.getAppStorage(webId, routePath);
  var folder = await fc.readFolder(path);
  for (var i = 0; i < folder.files.length; i++) {    
      var quadStream = await fc.readFile(folder.files[i].url);
      const turtleParser = new N3.Parser({ format: "Turtle" });
      let name,
        description,
        author,
        latitude,
        longitude = "";
      let points = [];
      turtleParser.parse(quadStream, (err, quad, prefixes) => {
        if (err) {
          throw err;
        }
        if (quad) {
          if (
            quad.predicate.value ===
            storageHelper.getPredicate(rutaShape.shape[1], rutaShape)
          ) {
            name = quad.object.value;
          } else if (
            quad.predicate.value ===
            storageHelper.getPredicate(rutaShape.shape[2], rutaShape)
          ) {
            description = quad.object.value;
          } else if (
            quad.predicate.value ===
            storageHelper.getPredicate(rutaShape.shape[3], rutaShape)
          ) {
            author = quad.object.value;
          } else if (
            quad.predicate.value ===
            storageHelper.getPredicate(rutaShape.shape[5], rutaShape)
          ) {
            longitude = quad.object.value;
          } else if (
            quad.predicate.value ===
            storageHelper.getPredicate(rutaShape.shape[6], rutaShape)
          ) {
            latitude = quad.object.value;
          } else if (
            quad.predicate.value ===
            storageHelper.getPredicate(rutaShape.shape[4], rutaShape)
          ) {
            let point = new Point(latitude, longitude);
            points.push(point);
          }
        } else if (quad === null) {
          let route = new Route(name, author, description, points);
          routes.push(route);
        }
      });
    }  
  return routes;
};

export const getMediaFromPod = async webId => {
  var media = [];
  var path = await storageHelper.getAppStorage(webId, mediaPath);
  var folder = await fc.readFolder(path);
  for (var i = 0; i < folder.files.length; i++) {
    var quadStream = await fc.readFile(folder.files[i].url);
    const turtleParser = new N3.Parser({ format: "Turtle" });
    let url,
      date,
      author = "";
    turtleParser.parse(quadStream, (err, quad, prefixes) => {
      if (err) {
        throw err;
      }
      if (quad) {
        if (
          quad.predicate.value ===
          storageHelper.getPredicate(mediaShape.shape[0], mediaShape)
        ) {
          url = quad.object.value;
        } else if (
          quad.predicate.value ===
          storageHelper.getPredicate(mediaShape.shape[1], mediaShape)
        ) {
          date = quad.object.value;
        } else if (
          quad.predicate.value ===
          storageHelper.getPredicate(mediaShape.shape[2], mediaShape)
        ) {
          author = quad.object.value;
        }
      } else if (quad === null) {
        let name = url.split('/')[5]; //TEMPORAL
        let m = new Multimedia(url, date, author, name);
        media.push(m);
      }
    });
  }
  return media;
};

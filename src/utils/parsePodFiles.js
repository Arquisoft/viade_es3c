import { Route, Point } from "domain";
import {storageHelper} from '@utils';
import rutaShape from "@contexts/route-shape.json";


const auth = require("solid-auth-cli");
const FC = require("solid-file-client");
const fc = new FC(auth);
const N3 = require("n3");
var routes = [];

export const getRoutesFromPod = async (webId) => {
  var path = await storageHelper.getAppStorage(webId);
  var folder = await fc.readFolder(path);
  for (var i = 0; i < folder.files.length; i++) {   
    var quadStream = await fc.readFile(folder.files[i].url);
    const turtleParser = new N3.Parser({ format: "Turtle" });
    var name = "";
    var description = "";
    var author = "";
    var points = [];
    var latitude = "";
    var longitude = "";
    turtleParser.parse(quadStream, (err, quad, prefixes) => {
      if (err) {
        throw err;
      }
      if (quad) {
        if (quad.predicate.value === storageHelper.getPredicate(rutaShape.shape[1], rutaShape)) {
          name = quad.object.value;
        } else if (quad.predicate.value === storageHelper.getPredicate(rutaShape.shape[2], rutaShape)) {
          description = quad.object.value;
        } else if (quad.predicate.value === storageHelper.getPredicate(rutaShape.shape[3], rutaShape)) {
          author = quad.object.value;
        } else if (
          quad.predicate.value === storageHelper.getPredicate(rutaShape.shape[5], rutaShape)
        ) {
          longitude = quad.object.value;
        } else if (
          quad.predicate.value === storageHelper.getPredicate(rutaShape.shape[6], rutaShape)
        ) {
          latitude = quad.object.value;
        } else if (
          quad.predicate.value === storageHelper.getPredicate(rutaShape.shape[4], rutaShape)
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

import * as notification from "./notification";
import { cleanup } from "react-testing-library";
import React from "react";
import * as parserFile from "./parserFile";
import { ParserFile } from "./parserFile";

afterAll(cleanup);

describe.only("Notification", () => {

  const parser = new ParserFile();

  test("geojson", () => {
    const geojson = '{"type": "FeatureCollection","features": [{"type": "Feature","properties": {},"geometry": {"type": "LineString","coordinates": [[28.10302734375,52.81604319154934],[27.83935546875,50.12057809796008],[29.860839843749996,49.296471602658066],[29.5751953125,51.876490970614775],[31.904296874999996,51.16556659836182],[31.3330078125,49.710272582105695]]}}]}';
    parser.parserGeoJSON(geojson);
  });

  test("gpx", () => {
    const gpx = '<?xml version="1.0" encoding="UTF-8"?><gpx creator="StravaGPX Android" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.topografix.com/GPX/1/1 http://www.topografix.com/GPX/1/1/gpx.xsd" version="1.1" xmlns="http://www.topografix.com/GPX/1/1"> <metadata><time>2019-05-11T18:16:59Z</time> </metadata> <trk><name>Atletismo al anochecer</name><type>9</type><trkseg> <trkpt lat="43.3614310" lon="-5.8551880"><ele>255.5</ele><time>2019-05-11T18:16:59Z</time> </trkpt> <trkpt lat="43.3614120" lon="-5.8551590"><ele>255.5</ele><time>2019-05-11T18:17:13Z</time> </trkpt> <trkpt lat="43.3613890" lon="-5.8551320"><ele>255.5</ele><time>2019-05-11T18:17:15Z</time> </trkpt> <trkpt lat="43.3613530" lon="-5.8550940"><ele>255.5</ele><time>2019-05-11T18:17:17Z</time> </trkpt> <trkpt lat="43.3613220" lon="-5.8550790"><ele>255.5</ele><time>2019-05-11T18:17:18Z</time> </trkpt> <trkpt lat="43.3612880" lon="-5.8550680"><ele>255.5</ele><time>2019-05-11T18:17:19Z</time> </trkpt></trkseg> </trk></gpx>';
    parser.parserGPX(gpx);
  });
});

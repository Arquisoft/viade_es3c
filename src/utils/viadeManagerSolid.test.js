import * as Manager from "./viadeManagerSolid";
import { cleanup } from "react-testing-library";
import { storageHelper, parsePodFiles, notification } from "@utils";
import Route from ".././domain/route";

afterAll(cleanup);

describe.only("viadeManager", () => {
  test("manager", async () => {
    expect(
      Manager.addMedia(null, "https://saragg.solid.community/profile/card#me")
    ).toMatchObject(
      storageHelper.addMedia(
        "https://saragg.solid.community/profile/card#me",
        null
      )
    );

    var img1 = "esto seria una imagen";
    var img2 = "esto seria otra imagen";
    const multimedia = [{ img1 }, { img2 }];
    const route = new Route("Prueba", "Sara", "prueba", null, multimedia);
    Manager.addRoute(route, "https://saragg.solid.community/profile/card#me");
  });
});

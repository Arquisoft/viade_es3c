import 'jest';

import {
  defineFeature,
  loadFeature,
} from 'jest-cucumber';
import { UploaderFiles } from "../../src/containers/NewRoute/route.style";
import { ButtonUploader } from "../../src/components/ButtonUploader/button-uploader.component";

const feature = loadFeature('./feature/features/newRoute.feature');
const puppeteer = require('puppeteer')
let browser = null;
let page = null;

defineFeature(feature, test => {

  beforeEach(async () => {
    jest.setTimeout(2000000000);
  });

  test('Trying to create a route', ({ given, when,and, then }) => {
    
    given('I am a user trying to create a route', async () => {
      browser = await puppeteer.launch({
        headless: false
      })

      page = await browser.newPage();
      await page.goto("http://localhost:3000/#/login", {
        waitUntil: 'networkidle2'
      });

      await page.waitForSelector(".sc-EHOje.cffgrt");
      await page.type(".sc-EHOje.cffgrt", "https://aliceprueba.solid.community/profile/card#me");

      await page.evaluate(() => {
        let btns = [...document.querySelectorAll("button")];
        btns.forEach(function (btn) {
          if (btn.innerText == "Iniciar sesión"){
            btn.click();
          }
        });
      });

      await page.waitForNavigation({
        waitUntil: 'networkidle2'
      });

      await page.waitForSelector("[id='username']", {visible: true});
      await page.type("[id='username']", "aliceprueba");

      await page.waitFor(500);
      await page.waitForSelector("[id='password']", {visible: true});
      await page.type("[id='password']", "Alice_prueba123", {visible: true});

      await page.waitFor(500);

      await page.evaluate(() => {
        let btns = [...document.querySelector(".form-horizontal.login-up-form").querySelectorAll("button")];
        btns.forEach(function (btn) {
          if (btn.innerText == "Log In")
            btn.click();
        });
      });

      await page.waitForNavigation({
        waitUntil: 'networkidle2'
      });

      expect(page.url()).toBe("http://localhost:3000/viade_es3c/#/welcome")

      await page.goto("http://localhost:3000/#/route", {
        waitUntil: 'networkidle2'
      });

    });

    when('Fill out the form', async () => {
      await page.waitForSelector("[id='route_name']", {visible: true});
      await page.type("[id='route_name']", "pruebaRuta");

      await page.waitForSelector("[id='description']", {visible: true});
      await page.type("[id='description']", "Esto es una prueba");

    });

    and('Putting the markers', async () => {

      await page.mouse.move(500, 500);
      await page.mouse.down({button: 'left'});
      await page.mouse.up({button: 'left'});

      await page.mouse.move(800, 800);
      await page.mouse.down({button: 'left'});
      await page.mouse.up({button: 'left'});

      await page.waitFor(500);

      await page.evaluate(() => {
        let submit = document.getElementById("save_route")
        submit.click();
      })
    });

    then('Redirect to my routes page', async () => {

      await page.waitForNavigation({
        waitUntil: 'networkidle2'
      });

      expect(page.url()).toBe("http://localhost:3000/#/myroutes")
    })

  });
});

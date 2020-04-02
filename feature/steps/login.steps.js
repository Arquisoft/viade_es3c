import 'jest';

import {
  defineFeature,
  loadFeature,
} from 'jest-cucumber';

const feature = loadFeature('./feature/features/login.feature');
const puppeteer = require('puppeteer')
let browser = null;
let page = null;

defineFeature(feature, test => {

  beforeEach(async () => {
    jest.setTimeout(20000000);
  });

  test('Trying to log in', ({ given, when,and, then }) => {
    
    given('I am a user trying to log in', async () => {
      browser = await puppeteer.launch({
        headless: false
      })
    
      page = await browser.newPage();
      await page.goto("http://localhost:3000/#/login", {
        waitUntil: 'networkidle2'
      });

    });

    when('Putting my webId', async () => {

        await page.waitForSelector(".sc-EHOje.cffgrt");
        await page.type(".sc-EHOje.cffgrt", "https://saragarcia.solid.community/profile/card#me");

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

    });

    and('Fill out the form', async () => {
  
      await page.waitForSelector("[id='username']", {visible: true});
      await page.type("[id='username']", "saraGarcia");

      await page.waitFor(500);
      await page.waitForSelector("[id='password']", {visible: true});
      await page.type("[id='password']", "Labra_123456", {visible: true});

      await page.waitFor(500);

      await page.evaluate(() => {
        let btns = [...document.querySelector(".form-horizontal.login-up-form").querySelectorAll("button")];
        btns.forEach(function (btn) {
          if (btn.innerText == "Log In")
            btn.click();
        });
      });

    });

    then('Redirect to welcome page', async () => {
  
          await page.waitForNavigation({
            waitUntil: 'networkidle2'
          });

          expect(page.url()).toBe("http://localhost:3000/viade_es3c/#/welcome")

      });
  });
});

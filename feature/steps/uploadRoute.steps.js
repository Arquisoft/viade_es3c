import "jest";

import { defineFeature, loadFeature } from "jest-cucumber";

const feature = loadFeature("./feature/features/uploadRoute.feature");
const puppeteer = require("puppeteer");
let browser = null;
let page = null;

defineFeature(feature, (test) => {
	beforeEach(async () => {
		jest.setTimeout(2000000);
	});

	test("Trying to upload a route with a file", ({ given, when, and, then }) => {
		given("I am a user trying to create a route with a geojson fle", async () => {
			browser = await puppeteer.launch({
				headless: false
			});
			// login
			page = await browser.newPage();
			await page.goto("http://localhost:3000/#/login", {
				waitUntil: "load",
				// Remove the timeout
				timeout: 0
			});
			await page.waitForSelector(".sc-EHOje.cffgrt");
			await page.type(".sc-EHOje.cffgrt", "https://saragg.solid.community/profile/card#me");
			await page.evaluate(() => {
				let btns = [ ...document.querySelectorAll("button") ];
				btns.forEach(function(btn) {
					if (btn.innerText === "Iniciar sesión") {
						btn.click();
					}
				});
			});
			await page.waitForNavigation({
				waitUntil: "networkidle2"
			});
			await page.waitForSelector("[id='username']", { visible: true });
			await page.type("[id='username']", "saragg");
			await page.waitFor(500);
			await page.waitForSelector("[id='password']", { visible: true });
			await page.type("[id='password']", "Prueba_123", { visible: true });
			await page.waitFor(500);
			await page.evaluate(() => {
				let btns = [ ...document.querySelector(".form-horizontal.login-up-form").querySelectorAll("button") ];
				btns.forEach(function(btn) {
					if (btn.innerText === "Log In") {
						btn.click();
					}
				});
			});
			await page.waitForNavigation({
				waitUntil: "networkidle2"
			});
			expect(page.url()).toBe("http://localhost:3000/#/welcome");

			await page.goto("http://localhost:3000/#/uploadRoute", {
				waitUntil: "networkidle2"
			});
		});

		when("Fill out the form of upload route view", async () => {
			await page.waitForSelector("[data-testid='route_name']", { visible: true });
			await page.type("[data-testid='route_name']", "pruebaRutaFichero");

			await page.waitForSelector("[data-testid='route_description']", { visible: true });
			await page.type("[data-testid='route_description']", "Esto es una prueba de geojson");

			const path = require("path");
			const imgPath = path.relative(process.cwd(), __dirname + "../../../public/img/covid.png");
			const input_img = await page.$("[id='input-img']");
			await input_img.uploadFile(imgPath);
			await input_img.evaluate((upload) => upload.dispatchEvent(new Event("change", { bubbles: true })));
			await page.waitFor(1000);
		});

		and("Upload the file and save route", async () => {
			const path = require("path");
			const filepath = path.relative(process.cwd(), __dirname + "/map.geojson");
			const input_file = await page.$("[data-testid='file-input']");
			await input_file.uploadFile(filepath);
			await input_file.evaluate((upload) => upload.dispatchEvent(new Event("change", { bubbles: true })));
			await page.waitFor(2000);

			await page.evaluate(() => {
				let submit = document.getElementById("butonSave");
				submit.click();
			});
		});

		then("It shows the route I had crated at my routes", async () => {
			await page.waitFor(5000);
			expect(page.url()).toBe("http://localhost:3000/#/myRoutes");
			await browser.close();
		});
	});
});

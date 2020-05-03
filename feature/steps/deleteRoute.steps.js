import "jest";

import { defineFeature, loadFeature } from "jest-cucumber";

const feature = loadFeature("./feature/features/deleteRoute.feature");
const puppeteer = require("puppeteer");
let browser = null;
let page = null;

defineFeature(feature, (test) => {
	beforeEach(async () => {
		jest.setTimeout(1200000);
	});

	test("Trying to delete a route", ({ given, when, then }) => {
		given("I am a user trying to delete one of my routes", async () => {
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
			await page.type(".sc-EHOje.cffgrt", "https://aliceprueba.solid.community/profile/card#me");
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
			await page.type("[id='username']", "aliceprueba");
			await page.waitFor(500);
			await page.waitForSelector("[id='password']", { visible: true });
			await page.type("[id='password']", "Alice_prueba123", { visible: true });
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

			await page.goto("http://localhost:3000/#/myRoutes", {
				waitUntil: "networkidle2"
			});

			await page.waitFor(500);

			await page.waitForSelector("#mapa");
		});

		when("Pressing delete button", async () => {
			await page.waitForSelector("#btnDelete");
			await page.click("#btnDelete");
		});

		then("Confirm the elimination", async () => {
			await page.waitForSelector("#btDelete");
			await page.click("#btDelete");
			await browser.close();
		});
	});
});

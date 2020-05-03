import "jest";

import { defineFeature, loadFeature } from "jest-cucumber";

const feature = loadFeature("./feature/features/notification.feature");
const puppeteer = require("puppeteer");
let browser = null;
let page = null;

defineFeature(feature, (test) => {
	beforeEach(async () => {
		jest.setTimeout(1200000);
	});

	test("Receive a notification", ({ given, when, then }) => {
		given("I am a user who has received a notification", async () => {
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
			await page.type(".sc-EHOje.cffgrt", "https://saragrz.solid.community/profile/card#me");
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
			await page.type("[id='username']", "saragrz");
			await page.waitFor(500);
			await page.waitForSelector("[id='password']", { visible: true });
			await page.type("[id='password']", "Prueba_123", { visible: true });
			await page.waitFor(500);
			await page.evaluate(() => {
				let btns = [ ...document.querySelector(".form-horizontal.login-up-form").querySelectorAll("button") ];
				btns.forEach(function(btn) {
					if (btn.innerText === "Log In") btn.click();
				});
			});
			await page.waitForNavigation({
				waitUntil: "networkidle2"
			});
			expect(page.url()).toBe("http://localhost:3000/#/welcome");
		});

		when("Pressing notification button", async () => {
			await page.waitForSelector("#mobile");
			await page.click("#mobile");

			await page.waitFor(4000);

			await page.evaluate(() => {
				document.querySelector("#notificationButton").click();
			});
			await page.waitFor(6000);
		});

		then("I will see the route at my shared routes view", async () => {
			await page.waitFor(5000);
			await page.waitForSelector(".sc-hrWEMg.glJa");
			await page.evaluate(() => {
				let btns = [ ...document.querySelector(".sc-hrWEMg.glJa").querySelectorAll("strong") ];
				btns.forEach(function(btn) {
					btn.click();
				});
			});
			await page.waitFor(5000);
			await page.waitForSelector("#mapa");
			await browser.close();
		});
	});
});

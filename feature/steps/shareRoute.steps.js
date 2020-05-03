import "jest";

import { defineFeature, loadFeature } from "jest-cucumber";

const feature = loadFeature("./feature/features/shareRoute.feature");
const puppeteer = require("puppeteer");
let browser = null;
let page = null;

defineFeature(feature, (test) => {
	beforeEach(async () => {
		jest.setTimeout(1200000);
	});

	test("Trying to share a route", ({ given, when, then }) => {
		given("I am a user trying to share a route", async () => {
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
			await page.type(".sc-EHOje.cffgrt", "https://saragarciarodri.solid.community/profile/card#me");
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
			await page.type("[id='username']", "saragarciarodri");
			await page.waitFor(500);
			await page.waitForSelector("[id='password']", { visible: true });
			await page.type("[id='password']", "Prueba_123", { visible: true });
			await page.waitFor(500);
			await page.evaluate(() => {
				let btns = [ ...document.querySelector(".form-horizontal.login-up-form").querySelectorAll("button") ];
				btns.forEach(function(btn) {
					if (btn.innerText == "Log In") btn.click();
				});
			});
			await page.waitForNavigation({
				waitUntil: "networkidle2"
			});
			expect(page.url()).toBe("http://localhost:3000/#/welcome");

			await page.goto("http://localhost:3000/#/myRoutes", {
				waitUntil: "networkidle2"
			});
		});
		when("Pressing share button", async () => {
			await page.waitFor(1000);
			await page.waitForSelector("#viewFriends");
			await page.click("#viewFriends");
			await page.evaluate(() => {
				let btns = [ ...document.querySelector(".btn-group").querySelectorAll("button") ];
				btns.forEach(function(btn) {
					if (btn.innerText == "Compartir ruta con...") btn.click();
				});
			});
		});

		then("I choose the friend to share", async () => {
			await page.waitFor(500);
			await page.evaluate(() => {
				document.querySelector("#saragg").click();
				document.querySelector("#saragrz").click();
			});
			await page.evaluate(() => {
				document.querySelector("#shareRoute").click();
			});
			await page.waitFor(500);
			await browser.close();
		});
	});
});

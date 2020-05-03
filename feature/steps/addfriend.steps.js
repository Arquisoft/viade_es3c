import "jest";

import { defineFeature, loadFeature } from "jest-cucumber";

const feature = loadFeature("./feature/features/addFriend.feature");
const puppeteer = require("puppeteer");
let browser = null;
let page = null;

defineFeature(feature, (test) => {
	beforeEach(async () => {
		jest.setTimeout(12000000);
	});

	test("Trying to add a friend", ({ given, when, then }) => {
		given("I am a user trying to add a friend", async () => {
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

			await page.goto("http://localhost:3000/#/myFriends", {
				waitUntil: "networkidle2"
			});
		});

		when("Putting his webId", async () => {
			await page.waitFor(500);

			await page.waitForSelector("[id='friendID']", { visible: true });
			await page.type("[id='friendID']", "https://saragarcia.solid.community/");
		});

		then("Pressing the add button", async () => {
			await page.evaluate(() => {
				let submit = document.getElementById("botonaddfriends");
				submit.click();
			});
			await page.waitForFunction(
				'document.querySelector("body").innerText.includes("https://saragarcia.solid.community/")'
			);
			await browser.close();
		});
	});
});

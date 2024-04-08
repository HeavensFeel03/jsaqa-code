let page;

beforeEach(async () => {
	page = await browser.newPage();
	await page.goto("https://github.com/team");
});

afterEach(() => {
	page.close();
});

describe("Github page tests", () => {
	test("The h1 header content'", async () => {
		const firstLink = await page.$("header div div a");
		await firstLink.click();
		await page.waitForSelector("h1");
		const title2 = await page.title();
		expect(title2).toEqual(
			"GitHub for teams · Build like the best teams on the planet · GitHub"
		);
	}, 3000);

	test("The first link attribute", async () => {
		const actual = await page.$eval("a", (link) => link.getAttribute("href"));
		expect(actual).toEqual("#start-of-content");
	}, 2000);

	test("The page contains Sign in button", async () => {
		const btnSelector = ".btn-large-mktg.btn-mktg";
		await page.waitForSelector(btnSelector, {
			visible: true,
		});
		const actual = await page.$eval(btnSelector, (link) => link.textContent);
		expect(actual).toMatch("Get started with Team");
	}, 2000);
}, 40000);


describe("GitHub Dashboard Tests", () => {
	test("Github Pricing", async () => {
		const buttonPricing = await page.$(
			"body > div.logged-out.env-production.page-responsive > div.position-relative.js-header-wrapper > header > div > div.HeaderMenu--logged-out.p-responsive.height-fit.position-lg-relative.d-lg-flex.flex-column.flex-auto.pt-7.pb-4.top-0 > div > nav > ul > li:nth-child(4) > a");
		await buttonPricing.click();
		await page.waitForTimeout(5000);
		const pagePricing = await page.waitForSelector(".application-main h1");
		const actualOriginal = await page.evaluate(
			(el) => el.textContent,
			pagePricing
		);
		const actual = +(actualOriginal).trim();
		const expected = +("Get the complete developer platform.");
		expect(actual).toEqual(expected);
	}, 10000);


	test("GitHub Sponsors", async () => {
		const buttonOpenSource = await page.$(
			"body > div.logged-out li:nth-child(3)  button"
		);
		await buttonOpenSource.click();
		const sourceGitHubSponsors = await page.$(
			"li:nth-child(3) div:nth-child(1) a"
		);
		await sourceGitHubSponsors.click();
		await page.waitForTimeout(1000);
		const pageSponsors = await page.waitForSelector(".application-main h1");
		await page.waitForTimeout(1000);

		const actualOriginal = await page.evaluate(
			(el) => el.textContent,
			pageSponsors
		);
		const actual = +(actualOriginal.trim());
		const expected = +("Invest in the software that powers your world");
		expect(actual).toEqual(expected);
	}, 15000);

	test("GitHub Subscribe", async () => {
		const subscribeLinkSelector = "div footer .col-12 > div > a";
		await page.waitForSelector(subscribeLinkSelector);
		await page.click(subscribeLinkSelector);
		await page.waitForTimeout(1000);
		const titleSubscribe = "#hero-section-brand-heading";
		await page.waitForSelector(titleSubscribe);
		const actual = await page.$eval(titleSubscribe, (el) => el.textContent);
		const expected = "Subscribe to our developer newsletter";
		expect(actual).toEqual(expected);
	}, 10000);

}, 50000);

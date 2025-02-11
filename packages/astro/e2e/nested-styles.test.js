import { test as base, expect } from '@playwright/test';
import { loadFixture } from './test-utils.js';

const test = base.extend({
	astro: async ({}, use) => {
		const fixture = await loadFixture({ root: './fixtures/nested-styles/' });
		await use(fixture);
	},
});

let devServer;

test.beforeAll(async ({ astro }) => {
	devServer = await astro.startDevServer();
});

test.afterAll(async ({ astro }) => {
	await devServer.stop();
});

test('Loading styles that are nested', async ({ page, astro }) => {
	await page.goto(astro.resolveUrl('/'));

	await test.step('header', async () => {
		const header = page.locator('header');

		await expect(header, 'should have background color').toHaveCSS(
			'background-color',
			'rgb(0, 0, 139)' // darkblue
		);
	});
});

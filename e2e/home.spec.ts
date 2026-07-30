import {expect, test} from '@playwright/test';
import {publicEnv} from '@/lib/env';

test('home page exposes the primary content and service navigation', async ({page}) => {
  await page.goto('/');

  await expect(page).toHaveTitle(/Zero Droplet/);
  await expect(page.getByRole('heading', {name: /better water/i})).toBeVisible();
  await expect(page.getByRole('heading', {name: /complete treatment solutions/i})).toBeVisible();

  await page.getByRole('link', {name: /learn more/i}).first().click();
  await expect(page).toHaveURL(/\/services\//);
});

test('sitemap is publicly available', async ({request}) => {
  const response = await request.get('/sitemap.xml');
  expect(response.ok()).toBeTruthy();
  expect(await response.text()).toContain(`${publicEnv.siteUrl}/contact`);
});

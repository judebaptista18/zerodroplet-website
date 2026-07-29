import {expect, test} from '@playwright/test';

test('a visitor can submit the contact form', async ({page}) => {
  await page.route('**/api/contact', async (route) => {
    await route.fulfill({status: 200, contentType: 'application/json', body: JSON.stringify({ok: true})});
  });

  await page.goto('/contact');
  await page.getByLabel('Name').fill('Jude Baptista');
  await page.getByLabel('Email').fill('jude@example.com');
  await page.getByLabel('Project requirements').fill('We need an industrial water treatment site survey.');
  await page.getByRole('button', {name: /send enquiry/i}).click();

  await expect(page.getByText(/your enquiry has been sent/i)).toBeVisible();
});

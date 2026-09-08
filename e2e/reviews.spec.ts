import {expect, test} from '@playwright/test';

// Match Next.js's development origin so client hydration is not blocked.
test.use({baseURL: 'http://localhost:3000'});

test('Google reviews display ratings, attribution and source links', async ({page}) => {
  await page.route('**/api/reviews', (route) => route.fulfill({json: {
    available: true, rating: 4.6, userRatingCount: 28,
    googleMapsUri: 'https://www.google.com/maps?cid=test',
    writeReviewUrl: 'https://search.google.com/local/writereview?placeid=test',
    attributions: [],
    reviews: [
      {name: 'one', rating: 5, authorAttribution: {displayName: 'Sample Customer', uri: 'https://www.google.com/maps/contrib/test'}, relativePublishTimeDescription: '2 months ago', originalText: {text: 'Test review: the team explained the treatment options clearly and supported us through installation.'}, googleMapsUri: 'https://www.google.com/maps/reviews/test'},
      {name: 'two', rating: 3, authorAttribution: {displayName: 'Sample Reviewer'}, relativePublishTimeDescription: '3 months ago', text: {text: 'Test review: helpful advice during our project.'}},
      {name: 'three', rating: 4, authorAttribution: {displayName: 'Sample Client'}, relativePublishTimeDescription: '4 months ago', text: {text: 'Test review: a professional site survey and clear recommendations.'}},
    ],
  }}));
  await page.goto('/');
  const section = page.locator('#reviews');
  await section.scrollIntoViewIfNeeded();
  await expect(section.getByText('4.6', {exact: true})).toBeVisible();
  await expect(section.getByText('Based on 28 Google reviews')).toBeVisible();
  await expect(section.getByRole('article')).toHaveCount(3);
  await expect(section.getByRole('img', {name: '3 out of 5 stars'})).toBeVisible();
  await expect(section.getByRole('link', {name: 'Sample Customer'})).toHaveAttribute('href', 'https://www.google.com/maps/contrib/test');
  await expect(section.getByRole('link', {name: /write a review/i})).toHaveAttribute('href', /writereview/);
  expect(await section.evaluate((element) => element.scrollWidth <= element.clientWidth)).toBe(true);
  await section.screenshot({path: test.info().outputPath('google-reviews.png')});
});

test('unavailable reviews show a useful profile link without fake ratings', async ({page}) => {
  await page.route('**/api/reviews', (route) => route.fulfill({status: 502, json: {available: false}}));
  await page.goto('/');
  const section = page.locator('#reviews');
  await section.scrollIntoViewIfNeeded();
  await expect(section.getByText('Explore customer feedback on our Google profile.')).toBeVisible();
  await expect(section.getByRole('link', {name: /view on google maps/i})).toBeVisible();
  await expect(section.getByRole('article')).toHaveCount(0);
  await expect(section.getByText(/placeholder|api key|Yotpo/i)).toHaveCount(0);
});

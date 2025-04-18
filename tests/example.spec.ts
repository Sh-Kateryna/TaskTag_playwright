import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  
    await page.goto('https://beta.app.tasktag.com/login');
  
  await page.getByLabel('Sign up').click();
  await page.getByRole('textbox', { name: 'Please enter your email' }).click();
  await page.getByRole('textbox', { name: 'Please enter your email' }).fill('shk@anadeainc.com');
  await page.getByRole('textbox', { name: 'Enter password' }).click();
  await page.getByRole('textbox', { name: 'Enter password' }).fill('Test1234567890&');
  await page.getByLabel('Create Account').locator('div').nth(1).click();
  await page.getByRole('textbox', { name: 'First Name' }).click();
  await page.getByRole('textbox', { name: 'First Name' }).fill('Kate');
  await page.getByRole('textbox', { name: 'Last Name' }).click();
  await page.getByRole('textbox', { name: 'Last Name' }).fill('Shuhai');
  await page.locator('input[type="tel"]').click();
  await page.locator('input[type="tel"]').fill('+380950448628');
  await page.getByText('Create Account').nth(1).click();
  await page.getByRole('textbox', { name: 'Team/Workplace name' }).click();
  await page.getByRole('textbox', { name: 'Team/Workplace name' }).fill('Test');
  await page.getByLabel('Create Team').locator('div').nth(1).click();
  await page.getByText('Welcome! Your 30-day trial').click();
  await page.getByLabel('Start a 30-day free trial').locator('div').first().click();

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle('Welcome! Your 30-day trial starts today.');
});

// test('get started link', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Click the get started link.
//   await page.getByRole('link', { name: 'Get started' }).click();

//   // Expects page to have a heading with the name of Installation.
//   await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
// });

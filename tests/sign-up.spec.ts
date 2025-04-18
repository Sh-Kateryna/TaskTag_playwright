import { test, expect } from '@playwright/test';
import { SignUpPage } from '../page-objects/sign-up-object';
import { getCurrentDateTime } from '../utils';
import { SignUpLocators } from '../signup-locators';

test('Successful signUp', async ({ page }) => {
  const signUpPage = new SignUpPage(page);

 
  await signUpPage.openFullScreen();
  await signUpPage.goto();

  //await signUpPage.signUp('test03@example.com', 'P@ssw0rd');
  const userEmail = `${getCurrentDateTime('YYYYMMddHHmmss')}@example.com`;
  const userPassword = 'P@ssw0rd';
  const lastName = `${getCurrentDateTime('YYYYMMddHHmmss')}`;
  const phone = `+3806${getCurrentDateTime('ddHHmmss')}`;

  await signUpPage.signUp(userEmail, userPassword, lastName, phone);
  await expect(page.getByLabel(SignUpLocators.logoutButton)).toBeVisible();
})
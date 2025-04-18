import { test, expect } from '@playwright/test';
import { LoginPage } from '../page-objects/login-objects';
import { getCurrentDateTime } from '../utils';
import { LoginLocators, SignUpLocators } from '../locators';

test('Successful login', async ({ page }) => {
  const loginPage = new LoginPage(page);

 
  await loginPage.openFullScreen();
  await loginPage.goto();

  //await signUpPage.signUp('test03@example.com', 'P@ssw0rd');
  const userEmail = 'shk@anadeainc.com';
  const userPassword = 'Test1234567890&';

  await loginPage.login(userEmail, userPassword);
  await expect(page.getByLabel(LoginLocators.newTaskButton)).toBeVisible();
})
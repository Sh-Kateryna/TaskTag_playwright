import { test, expect } from '@playwright/test';
import { LoginPage } from './support/pages/loginPage';
import { SignUpPage } from './support/pages/signupPage';
import { getCurrentDateTime } from './support/utils';

test.describe('Sign up with email', () => {
  test("R101 - Sign up with valid data: 'Email' field, 'Password' field, 'Profile' page", 
    async ({ page }) => {
      const signupPage = new SignUpPage(page);
      const timestamp = getCurrentDateTime('YYMMddHHmmss')
      const userEmail = `${timestamp}@example.com`;
      const userPassword = 'P@ssw0rd';
      const lastName = timestamp;
      const phone = `+1907${getCurrentDateTime('YYssSSS')}`;
  
      await signupPage.goto()
      await signupPage.signUp(userEmail, userPassword, lastName, phone);
      await expect(page).toHaveURL(/.*\/my-account\/.*/);
      await expect(page.getByLabel('Log out')).toBeVisible();
      await expect(page.getByLabel('New Task')).toBeVisible();
    }
  );

  test("R102 - Sign up with invalid 'Email' and valid 'Password' (no @ character)", 
    async ({ page }) => {
      const signupPage = new SignUpPage(page);
      const userEmail = `${getCurrentDateTime('YYMMddHHmmss')}example.com`;
      const userPassword = 'P@ssw0rd';
  
      await signupPage.goto()
      await signupPage.fillLoginData(userEmail, userPassword);
      await expect(page.getByText('Invalid email address')).toBeVisible();
      await expect(signupPage.createAccountButtonFirst.isDisabled()).toBeTruthy();
    }
  );
});

test.describe('Log in with email', () => {
  test("R401 - Log in with valid 'Email' and 'Password' fields", 
    async ({ page }) => {
      const loginPage = new LoginPage(page);
      const userEmail = 'vscode@example.com';
      const userPassword = 'P@ssw0rd';

      await loginPage.goto()
      await loginPage.login(userEmail, userPassword);
      await expect(page).toHaveURL(/projects\/allprojects/);
      await expect(page.getByLabel('New Task')).toBeVisible();
    }
  );

  // skipped to avoid unnecessary login attempts
  test.skip("R402 - Log in with valid 'Email' and invalid 'Password' fields", 
    async ({ page }) => {
      const loginPage = new LoginPage(page);
      const userEmail = 'incorrect@example.com';
      const userPassword = 'invalid';

      await loginPage.goto()
      await loginPage.login(userEmail, userPassword);
      await expect(loginPage.loginErrorMessage).toBeVisible();
      await expect(loginPage.emailInput).toHaveValue(userEmail);
      await expect(loginPage.loginButton.isDisabled()).toBeTruthy();
    }
  );
});

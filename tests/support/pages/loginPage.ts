import { Locator, Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly loginButton: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly rememberMeCheckbox: Locator;
  readonly forgotPasswordLink: Locator;
  readonly loginErrorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.loginButton = page.getByLabel('Log in');
    this.emailInput = page.getByLabel('Email');
    this.passwordInput = page.getByLabel('Password', { exact: true });
    this.rememberMeCheckbox = page.getByLabel('Remember me');
    this.forgotPasswordLink = page.getByLabel('Forgot password?');
    this.loginErrorMessage = page.getByText('Invalid email or password.');
  };

  async goto() {
    await this.page.goto('/login');
  };

  async login(email: string, password: string) {
    await this.loginButton.click();
    await this.emailInput.click();
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  };
};

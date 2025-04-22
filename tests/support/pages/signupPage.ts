import { Locator, Page } from '@playwright/test';

export class SignUpPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly createAccountButtonFirst: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly phoneInput: Locator;
  readonly createAccountButtonSecond: Locator;
  readonly skipButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.getByLabel('Please enter your email');
    this.passwordInput = page.getByLabel('Enter password');
    this.createAccountButtonFirst = page.getByLabel('Create Account');
    this.firstNameInput = page.getByRole('textbox', { name: 'First Name' });
    this.lastNameInput = page.getByRole('textbox', { name: 'Last Name' });
    this.phoneInput = page.locator('input[type="tel"]');
    this.createAccountButtonSecond = page.getByLabel('Create Account').nth(1);
    this.skipButton = page.getByLabel('Skip');
  };

  async goto() {
    await this.page.goto('/register/signup-with-email');
  };

  async signUp(email: string, password: string,  lastName: string, phone: string) {
    await this.emailInput.click();
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.createAccountButtonFirst.click();
    await this.firstNameInput.click();
    await this.firstNameInput.fill('Awesomeuser');
    await this.lastNameInput.click();
    await this.lastNameInput.fill(lastName);
    await this.phoneInput.click();
    await this.phoneInput.fill(phone);
    await this.createAccountButtonSecond.click();
    await this.skipButton.click();
  };

  async fillLoginData(email: string, password: string) {
    await this.emailInput.click();
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.createAccountButtonFirst.click();
  }

  async fillProfileData(firstName: string, lastName: string, phone: string) {
    await this.firstNameInput.click();
    await this.firstNameInput.fill('Awesomeuser');
    await this.lastNameInput.click();
    await this.lastNameInput.fill(lastName);
    await this.phoneInput.click();
    await this.phoneInput.fill(phone);
    await this.createAccountButtonSecond.click();
  }
};

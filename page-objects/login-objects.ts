
import { Locator, Page } from '@playwright/test';
import { LoginLocators, SignUpLocators } from '../locators';

export class LoginPage {
    readonly page: Page;
    readonly loginButton: Locator;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly rememberMeCheckbox: Locator;
    readonly forgotPasswordLink: Locator;
    readonly loginErrorMessage: Locator;
  
    readonly skipButton: Locator;
    readonly welcomeText: Locator;
    readonly createAccountButtonSecond: Locator;
    readonly logoutButton: Locator;

    constructor(page: Page) {
       this.page = page;
       this.loginButton = page.getByLabel(LoginLocators.loginButton);
       this.emailInput = page.getByLabel(LoginLocators.emailInput);
       this.passwordInput = page.getByRole('textbox', LoginLocators.passwordInputRole);
      }

    async goto() {
        await this.page.goto('`${urls.base}`');
    }
   async openFullScreen() {
      await this.page.setViewportSize({ width: 1449, height: 1250});
};

    async login(email: string, password: string) {

        await this.loginButton.click();
        await this.emailInput.click();
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
  
        await this.loginButton.click();

    }
}

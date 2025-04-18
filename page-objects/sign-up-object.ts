import { Page, Locator } from '@playwright/test';
import { SignUpLocators } from '../locators';

export class SignUpPage {
    readonly page: Page;
    readonly signUpButton: Locator;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly createAccountButtonFirst: Locator;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly phoneInput: Locator;
    readonly skipButton: Locator;
    readonly welcomeText: Locator;
    readonly createAccountButtonSecond: Locator;
    readonly logoutButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.signUpButton = page.getByLabel(SignUpLocators.singUpButton);
        this.emailInput = page.getByLabel(SignUpLocators.emailInput);
        this.passwordInput = page.getByLabel(SignUpLocators.passwordInput);
        this.createAccountButtonFirst = page.getByLabel(SignUpLocators.createAccountButtonText);
        this.firstNameInput = page.getByRole('textbox', SignUpLocators.firstNameInputRole);
        this.lastNameInput = page.getByRole('textbox', SignUpLocators.lastNameInputRole);
        this.phoneInput = page.locator(SignUpLocators.phoneInputSelector);
        this.createAccountButtonSecond = page.getByText(SignUpLocators.createAccountButtonSecondText).nth(1);
        this.skipButton = page.getByLabel(SignUpLocators.skipButton);
        
      }

    async goto() {
        await this.page.goto('`${urls.base}`');
    }
   async openFullScreen() {
      await this.page.setViewportSize({ width: 1449, height: 1250});
};

    async signUp(email: string, password: string,  lastName: string, phone: string) {

        await this.signUpButton.click();
        await this.emailInput.click();
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.createAccountButtonFirst.click();
        await this.firstNameInput.click();
        await this.firstNameInput.fill('Kate');
        await this.lastNameInput.click();
        await this.lastNameInput.fill(lastName);
        await this.phoneInput.click();
        await this.phoneInput.fill( phone);
        await this.createAccountButtonSecond.click();
        await this.skipButton.click();
        
        
    }
}

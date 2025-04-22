import { Locator, Page } from '@playwright/test';
import { NavigationSection } from '../sections/navigationSection';
import { chatSection } from '../sections/chatSection';

export class BasePage {
  readonly page: Page;
  readonly navigationSection: NavigationSection;
  readonly chatSection: chatSection;
  readonly newTaskButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.chatSection = new chatSection(page);
    this.navigationSection = new NavigationSection(page);
    this.newTaskButton = page.getByLabel('New Task');
  };

  /**
   * @param email default value is `vscode@example.com`
   * @param password default value is `P@ssw0rd`
   */
  async loginAs(email: string='vscode@example.com', password: string='P@ssw0rd') {
    await this.page.goto('/login');
    await this.page.getByLabel('Email').fill(email);
    await this.page.getByLabel('Password', { exact: true }).fill(password);
    await this.page.getByLabel('Log in').click();
  };
}

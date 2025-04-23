import { Locator, Page } from '@playwright/test';
import { ChatSection } from '../sections/chatSection';

export class NavigationSection {
  readonly projects: Locator;
  readonly tasks: Locator;
  readonly activity: Locator;
  readonly contacts: Locator;
  readonly help: Locator;
  readonly myAccount: Locator;

  constructor(private page: Page) {
    this.page = page;
    this.projects = page.getByRole('link', { name: 'Projects' });
    this.tasks = page.getByRole('link', { name: 'My Tasks' });
    this.activity = page.getByRole('link', { name: 'Activity' });
    this.contacts = page.getByRole('link', { name: 'Contacts' });
    this.help = page.getByRole('link', { name: 'Help' });
    this.myAccount = page.getByRole('link', { name: 'My Account' });
  };
};

export class BasePage {
  readonly page: Page;
  readonly navigationSection: NavigationSection;
  readonly chatSection: ChatSection;
  readonly newTaskButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.chatSection = new ChatSection(page);
    this.navigationSection = new NavigationSection(page);
    this.newTaskButton = page.getByLabel('New Task');
  };

  async loginAs(email: string='vscode@example.com', password: string='P@ssw0rd') {
    await this.page.goto('/login');
    await this.page.getByLabel('Email').fill(email);
    await this.page.getByLabel('Password', { exact: true }).fill(password);
    await this.page.getByLabel('Log in').click();
  };
}

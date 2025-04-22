import { Locator, Page } from '@playwright/test';

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

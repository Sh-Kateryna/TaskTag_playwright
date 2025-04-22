import { Locator, Page } from '@playwright/test';
import { BasePage } from './basePage';

export class CreateProjectForm {
  readonly copyFromExistingProjectButton: Locator;
  readonly projectNameInput: Locator;
  readonly projectDescriptionInput: Locator;
  readonly projectAddressButton: Locator;
  readonly projectTeamButton: Locator;
  readonly projectColorButton: Locator;
  readonly projectIconButton: Locator;
  readonly projectAddMembersButton: Locator;
  readonly createProjectButton: Locator;

  constructor(private page: Page) {
    this.page = page;
    this.copyFromExistingProjectButton = page.getByLabel('Copy from existing project');
    this.projectNameInput = page.getByLabel('Enter project name');
    this.projectDescriptionInput = page.getByLabel('Description');
    this.projectAddressButton = page.getByLabel('Address');
    this.projectTeamButton = page.getByLabel('Team');
    this.projectColorButton = page.getByLabel('Color');
    this.projectIconButton = page.getByLabel('Icon');
    this.projectAddMembersButton = page.getByLabel('Add Members');
    this.createProjectButton = page.locator("//div[@aria-label='Cancel']/../following-sibling::div/div[@aria-label='Create Project']");
  };

  async createProject(name: string) {
    await this.projectNameInput.fill(name);
    await this.createProjectButton.click();
    await this.page.waitForTimeout(2000);
    if (await this.createProjectButton.isVisible()) {
      await this.createProjectButton.click();
    }
  };
};

export class ProjectsPage extends BasePage {
  readonly page: Page;
  readonly createProjectForm: CreateProjectForm;
  readonly createProjectButton: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.createProjectForm = new CreateProjectForm(page);
    this.createProjectButton = page.getByLabel('Create Project' );
  };

  async goto() {
    await this.page.goto('/projects/allprojects');
  };
};

export class ProjectDetailsPage extends BasePage {
  readonly page: Page;
  readonly projectName: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.projectName = page.getByLabel('Project title');
  };
}

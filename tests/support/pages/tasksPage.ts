import { Locator, Page } from '@playwright/test';
import { BasePage } from './basePage';

export class CreateTaskForm {
  readonly taskNameInput: Locator;
  readonly taskDescriptionInput: Locator;
  readonly taskProjectButton: Locator;
  readonly taskStartDateButton: Locator;
  readonly taskDueDateButton: Locator;
  readonly taskPriorityLow: Locator;
  readonly taskPriorityMedium: Locator;
  readonly taskPriorityHigh: Locator;
  readonly taskAddMembersButton: Locator;
  readonly createTaskButton: Locator;

  constructor(private page: Page) {
    this.page = page;
    this.taskNameInput = page.getByLabel('Name');
    this.taskDescriptionInput = page.getByLabel('Add description');
    this.taskProjectButton = page.getByLabel('Add to project');
    this.taskStartDateButton = page.getByLabel('Start Date');
    this.taskDueDateButton = page.getByLabel('Due Date');
    this.taskPriorityLow = page.getByLabel('Low');
    this.taskPriorityMedium = page.getByLabel('Medium');
    this.taskPriorityHigh = page.getByLabel('High');
    this.taskAddMembersButton = page.getByLabel('Add Members');
    this.createTaskButton = page.getByLabel('Create Task');
  };

  async createTask(name: string) {
    await this.taskNameInput.fill(name);
    await this.createTaskButton.click();
    await this.page.waitForTimeout(2000);
    if (await this.createTaskButton.isVisible()) {
      await this.createTaskButton.click();
    }
  };
};

export class TasksPage extends BasePage {
  readonly page: Page;
  readonly createTaskForm: CreateTaskForm;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.createTaskForm = new CreateTaskForm(page);
  };

  async goto() {
    await this.page.goto('/tasks');
  };
};

import { test, expect } from '@playwright/test';
import { TasksPage } from './support/pages/tasksPage';
import { getCurrentDateTime } from './support/utils';

test.describe('Create Task', () => {
  test("T204 - Create Task - long name (max chars - 25)",
    async ({ page }) => {
      const tasksPage = new TasksPage(page);
      const dt = getCurrentDateTime('MMddHHmm');
      const taskName = `T204: KTask ${dt} maximum 25 characters`;
      const taskNameShort = `T204: KTask ${dt} maxi`;

      await tasksPage.loginAs();
      await tasksPage.navigationSection.projects.click();
      await page.locator("//*[@aria-label='Project']").nth(0).click();
      await page.waitForURL(/projects\/.+\/tasks/);
      
      await tasksPage.newTaskButton.click();
      await tasksPage.createTaskForm.createTask(taskName);

      await expect(page.locator(`//*[@aria-label='current']//*[@aria-label='${taskNameShort}']`)).toBeVisible();
    }
  );
});

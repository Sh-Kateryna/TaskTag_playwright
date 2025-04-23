import { test, expect } from '@playwright/test';
import { ProjectsPage, ProjectDetailsPage } from './support/pages/projectsPage';
import { getCurrentDateTime } from './support/utils';

test.describe('Create Project', () => {
  test("P101 - Create form - 'Name' field 10 characters",
    async ({ page }) => {
      const projectsPage = new ProjectsPage(page);
      const projectDetailsPage = new ProjectDetailsPage(page); 
      const projectName = getCurrentDateTime('MMddHHmmss')

      await projectsPage.loginAs();

      await projectsPage.createProjectButton.click();
      await projectsPage.createProjectForm.createProject(projectName);

      await expect(page).toHaveURL(/projects\/\d+\/tasks/);
      await expect(projectDetailsPage.projectName).toHaveText(projectName);
    }
  );
});

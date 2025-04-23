import { test, expect } from '@playwright/test';
import { BasePage } from './support/pages/basePage';
import { getCurrentDateTime } from './support/utils';

test.describe('Chat', () => {
  test('C402 - Type and send a short message (<50 char)',
    async ({ page }) => {
      const basePage = new BasePage(page);
      const message = `C402 - Send a short message, ${getCurrentDateTime('YYMMddHHmmss')}`
  
      await basePage.loginAs();

      await basePage.chatSection.openExistingChat('TaskTag Support');
      await basePage.chatSection.sendMessage(message);
  
      await expect(page.getByText(message)).toBeVisible();
    }
  );
});

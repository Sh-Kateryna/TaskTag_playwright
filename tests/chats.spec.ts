import path from 'path';
import { test, expect } from '@playwright/test';
import { BasePage } from './support/pages/basePage';
import { SignUpPage } from './support/pages/signupPage';
import { getCurrentDateTime } from './support/utils';

test.describe('New Chat', () => {
  test('C204 - Search member',
    async ({ page }) => {
      const basePage = new BasePage(page);
      const memberName = 'TaskTag Support';
      
      await basePage.loginAs();

      await basePage.chatSection.newChatButton.click();
      await basePage.chatSection.newChatForm.searchMember(memberName);
      await expect(basePage.chatSection.newChatForm.contactTitle).toHaveText(memberName);
    }
  );

  test("C208 - Create a 'New Group Chat' - without group name",
    async ({ page }) => {
      const basePage = new BasePage(page);
 
      await basePage.loginAs('katalon@example.com');
  
      await basePage.chatSection.newChatButton.click();
      await basePage.chatSection.newChatForm.newGroupChatButton.click();
      await basePage.chatSection.newChatForm.contactTitle.click();
      await basePage.chatSection.newChatForm.contactTitle.click();
      await basePage.chatSection.newChatForm.nextButton.click();
      await basePage.chatSection.newChatForm.createGroupButton.click();
  
      await expect(basePage.chatSection.chatHistory).toContainText('has created a group');
    }
  );
});

test.describe('Chat Request', () => {
  test("C302 - Accept user's request",
    async ({ page }) => {
      const signupPage = new SignUpPage(page);
      const basePage = new BasePage(page);
      const timestamp = getCurrentDateTime('YYMMddHHmmss')
      const requestUserName = `Awesomeuser ${timestamp}`;
      const userName = 'vscode staging';
  
      await signupPage.goto()
      await signupPage.signUp(
        `${timestamp}@example.com`, 
        'P@ssw0rd', 
        timestamp, 
        `+1907${getCurrentDateTime('YYssSSS')}`
      );
      await basePage.chatSection.newChatButton.click();
      await basePage.chatSection.newChatForm.searchMember('vscode staging');
      await page.waitForTimeout(1000);
      await basePage.chatSection.sendRequestAdd(userName).click();
      await page.waitForTimeout(1000);
      await expect(basePage.chatSection.sendRequestPending(userName)).toBeVisible();

      await basePage.loginAs()
      await basePage.chatSection.openExistingChat(`${requestUserName}`);
      await basePage.chatSection.acceptRequestButton.click();
      await page.waitForTimeout(2000);
      await expect(basePage.chatSection.messageInput).toBeVisible();
      await expect(basePage.chatSection.message('Connection request approved')).toBeVisible();
    }
  );
  test("C303 - Decline user's request",
    async ({ page }) => {
      const signupPage = new SignUpPage(page);
      const basePage = new BasePage(page);
      const timestamp = getCurrentDateTime('YYMMddHHmmss')
      const requestUserName = `Awesomeuser ${timestamp}`;
      const userName = 'vscode staging';
  
      await signupPage.goto()
      await signupPage.signUp(
        `${timestamp}@example.com`, 
        'P@ssw0rd', 
        timestamp, 
        `+1907${getCurrentDateTime('YYssSSS')}`
      );
      await basePage.chatSection.newChatButton.click();
      await basePage.chatSection.newChatForm.searchMember('vscode staging');
      await page.waitForTimeout(1000);
      await basePage.chatSection.sendRequestAdd(userName).click();
      await page.waitForTimeout(1000);
      await expect(basePage.chatSection.sendRequestPending(userName)).toBeVisible();

      await basePage.loginAs()
      await basePage.chatSection.openExistingChat(`${requestUserName}`);
      await basePage.chatSection.declineRequestButton.click();
      await expect(basePage.chatSection.chatItem(`${requestUserName}`)).not.toBeVisible();
    }
  );
});

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

test.describe('Media & Files', () => {
  test('C602 - Send file to the chat',
    async ({ page }) => {
      const basePage = new BasePage(page);
      const dir = path.join(__dirname, 'support', 'files');
      const file = path.join(dir, 'sample.pdf')
      const fileChooserPromise = page.waitForEvent('filechooser');

      // login and open chat
      await basePage.loginAs('katalon@example.com');
      await basePage.chatSection.openExistingChat('User Example');
      await basePage.chatSection.messageInput.click();

      // file upload
      await basePage.chatSection.fileUploadButton.click();
      const fileChooser = await fileChooserPromise;
      await fileChooser.setFiles(file);
      await page.waitForTimeout(1000);
      await basePage.chatSection.sendMessageButton.click();
      await expect(basePage.chatSection.lastMessage).toContainText('sample.pdf');
    }
  );
})

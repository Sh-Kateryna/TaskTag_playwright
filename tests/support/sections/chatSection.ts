import { Locator, Page } from '@playwright/test';

export class chatSection {
  readonly newChatButton: Locator;
  readonly messageInput: Locator;

  constructor(private  page: Page) {
    this.page = page;
    this.newChatButton = page.getByLabel('New Message');
    this.messageInput = page.getByPlaceholder('Type message here...');
  };

  async openExistingChat(chatName: string) {
    await this.page.getByLabel(chatName).click();
  }

  async sendMessage(message: string) {
    await this.messageInput.click();
    await this.messageInput.fill(message);
    await this.page.keyboard.press('Enter');
  }
}

import { Locator, Page } from '@playwright/test';

export class NewChatForm {
  readonly searchInput: Locator;
  readonly contactTitle: Locator;
  readonly newGroupChatButton: Locator;
  readonly nextButton: Locator;
  readonly createGroupButton: Locator;

  constructor(private page: Page) {
    this.page = page;
    this.searchInput = page.locator("//div[@aria-label = 'New Chat Screen']//div[@aria-label = 'Search']/input");
    this.contactTitle = page.getByLabel('Contact title').nth(0);
    this.newGroupChatButton = page.getByLabel('New Group Chat');
    this.nextButton = page.getByLabel('Next');
    this.createGroupButton = page.getByLabel('Create Group');
  };

  async searchMember(memberName: string) {
    await this.searchInput.click();
    await this.searchInput.fill(memberName);
    await this.page.waitForTimeout(2000); // Wait for the search result to load
  };
};

export class ChatSection {
  readonly newChatForm: NewChatForm;
  readonly newChatButton: Locator;
  readonly messageInput: Locator;
  readonly chatHistory: Locator;
  readonly acceptRequestButton: Locator;
  readonly declineRequestButton: Locator;

  constructor(private  page: Page) {
    this.page = page;
    this.newChatForm = new NewChatForm(page);
    this.newChatButton = page.getByLabel('New Message');
    this.messageInput = page.getByPlaceholder('Type message here...');
    this.chatHistory = page.getByLabel('Chat History').nth(0);
    this.acceptRequestButton = page.getByLabel('Accept Friend Request');
    this.declineRequestButton = page.getByLabel('Decline Friend Request');
  };

  sendRequestAdd(memberName: string): Locator {
    return this.page.locator(`//div[@aria-label='${memberName}']//div[text()='Add']`);
  }

  sendRequestPending(memberName: string): Locator {
    return this.page.locator(`//div[@aria-label='New Chat Screen']//div[@aria-label='${memberName}']//div[text()='Pending']`);
  }

  chatItem(chatName: string): Locator {
    return this.page.locator(`//div[@aria-label='Chat item']//div[@aria-label='Chat title'][text()='${chatName}']`);
  }

  message(message: string): Locator {
    return this.page.locator(`//div[@aria-label='Message']//span[text()='${message}']`);
  }

  async openExistingChat(chatName: string) {
    await this.page.getByLabel(chatName).click();
  };

  async sendMessage(message: string) {
    await this.messageInput.click();
    await this.messageInput.fill(message);
    await this.page.keyboard.press('Enter');
  };
}

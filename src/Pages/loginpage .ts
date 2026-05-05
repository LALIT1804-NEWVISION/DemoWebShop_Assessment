import { Page, Locator } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly loginLink: Locator;
  readonly emailField: Locator;
  readonly passwordField: Locator;
  readonly loginButton: Locator;
  readonly logoutLink: Locator;
  readonly invaliderrorMessage: Locator;
  readonly accountEmail: Locator;

  constructor(page: Page) {
    this.page = page;

    this.loginLink = page.locator("//a[text()='Log in']");
    this.emailField = page.locator("//input[@id='Email']");
    this.passwordField = page.locator("//input[@id='Password']");
    this.loginButton = page.locator("//input[@value='Log in']");
    this.logoutLink = page.locator("//a[text()='Log out']");
    this.invaliderrorMessage = page.locator("//div[@class='validation-summary-errors']");
    this.accountEmail = page.locator("//a[@class='account' and contains(text(),'@')]");
  }
}


import { Page, Locator } from "@playwright/test";

export class HomePage {
  page: Page;

  readonly topMenu: Locator;
  readonly books: Locator;
  readonly computers: Locator;
  readonly electronics: Locator;
  readonly apparel: Locator;
  readonly products: Locator;

  readonly newsletterInput: Locator;
  readonly subscribeBtn: Locator;
  readonly newsletterSuccessMsg: Locator;

  constructor(page: Page) {
    this.page = page;

    this.topMenu = page.locator(".top-menu");
    this.books = this.topMenu.getByRole("link", { name: "Books" });
    this.computers = this.topMenu.getByRole("link", { name: "Computers" });
    this.electronics = this.topMenu.getByRole("link", { name: "Electronics" });
    this.apparel = this.topMenu.getByRole("link", { name: "Apparel & Shoes" });
    this.products = page.locator(".product-item");

    this.newsletterInput = page.locator("#newsletter-email");
    this.subscribeBtn = page.locator("#newsletter-subscribe-button");
    this.newsletterSuccessMsg = page.locator("#newsletter-result-block");
  }
}
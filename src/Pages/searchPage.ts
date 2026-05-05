import { Page, Locator } from "@playwright/test";

export class SearchPage {
  page: Page;

  readonly searchBox: Locator;
  readonly searchBtn: Locator;
  readonly products: Locator;
  readonly productTitles: Locator;

  constructor(page: Page) {
    this.page = page;

    this.searchBox = page.locator("#small-searchterms");
    this.searchBtn = page.locator("input[value='Search']");
    this.products = page.locator(".product-item");
    this.productTitles = page.locator(".product-item h2");
  }
}
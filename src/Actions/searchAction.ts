import { expect, Page } from "@playwright/test";
import { SearchPage } from "../Pages/searchPage"; 

export class SearchAction {
  searchPage: SearchPage;

  constructor(page: Page) {
    this.searchPage = new SearchPage(page);
  }
  async searchProduct(product: string) {
    await this.searchPage.searchBox.fill(product);
    await this.searchPage.searchBtn.click();
  }

  async verifySearchResults() {
    await expect(this.searchPage.page).toHaveURL(/search/);
    await expect(this.searchPage.products.first()).toBeVisible();
    const count = await this.searchPage.products.count();
    expect(count).toBeGreaterThan(0);
    await expect(this.searchPage.productTitles.first()).toBeVisible();
  }
}
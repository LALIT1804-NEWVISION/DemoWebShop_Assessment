import { Page, Locator } from "@playwright/test";

export class WishlistPage {
  page: Page;
  wishlistLink: Locator;

  constructor(page: Page) {
    this.page = page;

    this.wishlistLink = page.getByRole('link', {name: 'Wishlist',exact: true});
  }

  async openWishlist() {
    await this.wishlistLink.click();
  }
}
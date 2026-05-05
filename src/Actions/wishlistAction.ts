import { expect, Page } from "@playwright/test";
import { WishlistPage } from "../../src/Pages/wishlistPage";

export class WishlistAction {
  wishlistPage: WishlistPage;

  constructor(page: Page) {
    this.wishlistPage = new WishlistPage(page);
  }

  async openWishlist() {
    await this.wishlistPage.wishlistLink.click();
  }
  async verifyProductInWishlist() {
    await expect(this.wishlistPage.page.locator(".wishlist-content")).toBeVisible();
  }
}
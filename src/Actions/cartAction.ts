import { expect, Page } from "@playwright/test";
import { CartPage } from "../Pages/cartPage";

export class CartAction {
  cartPage: CartPage;

  constructor(page: Page) {
    this.cartPage = new CartPage(page);
  }

  async openCart() {
    await this.cartPage.cartLink.click();
  }

  async verifyCartNotEmpty() {
    await expect(this.cartPage.cartItems.first()).toBeVisible();
  }

  async verifyProductNameVisible() {
    await expect(this.cartPage.productName.first()).toBeVisible();
  }

  async verifyProductPriceVisible() {
    await expect(this.cartPage.productPrice.first()).toBeVisible();
  }

  async verifyTotalPriceVisible() {
    await expect(this.cartPage.totalPrice).toBeVisible();
  }

  async removeItem() {
    await this.cartPage.removeCheckbox.check();
    await this.cartPage.updateCartBtn.click();
    await expect(this.cartPage.orderSummary).toBeVisible();
  }

  async verifyCartEmpty() {
    await expect(this.cartPage.orderSummary).toContainText("Your Shopping Cart is empty");
  }

  async updateQuantity(qty: string) {
    await this.cartPage.qtyInput.fill(qty);
    await this.cartPage.updateCartBtn.click();
  }

  async verifyUpdatedQuantity(qty: string) {
    await expect(this.cartPage.qtyInput).toHaveValue(qty);
  }

  async applyCoupon(code: string) {
    await this.cartPage.couponInput.fill(code);
    await this.cartPage.applyCouponBtn.click();
  }
  async getCartTotal() {
    return (await this.cartPage.cartTotal.textContent()) || "";
  }
  async verifyTotalUnchanged(beforeTotal: string, afterTotal: string) {
    expect(afterTotal.trim()).toBe(beforeTotal.trim());
  }

  async verifyCouponError() {
    await expect(this.cartPage.couponMessage).toContainText("coupon");
  }

  async verifyCartItemsVisible() {
    await expect(this.cartPage.cartItems.first()).toBeVisible();
  }
}
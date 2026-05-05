import { Page, Locator } from "@playwright/test";

export class CartPage {
  page: Page;

  // Locators
  cartLink: Locator;
  productName: Locator;
  productPrice: Locator;
  totalPrice: Locator;
  removeCheckbox: Locator;
  updateCartBtn: Locator;
  qtyInput: Locator;
  couponInput: Locator;
  applyCouponBtn: Locator;
  orderSummary: Locator;
  couponMessage: Locator;
  cartItems: Locator;
  cartTotal :Locator;


  constructor(page: Page) {
    this.page = page;
    this.cartLink = page.locator("#topcartlink");
    this.productName = page.locator(".cart-item-row .product-name");
    this.productPrice = page.locator(".cart-item-row .product-unit-price");
    this.totalPrice = page.locator(".cart-total-right .order-total strong");
    this.removeCheckbox = page.locator("input[name='removefromcart']");
    this.updateCartBtn = page.locator("input[name='updatecart']");
    this.qtyInput = page.locator("input.qty-input");
    this.couponInput = page.locator("//input[@name='discountcouponcode']");
    this.applyCouponBtn = page.locator("input[name='applydiscountcouponcode']");
    this.orderSummary = page.locator(".order-summary-content");
    this.couponMessage = page.locator(".message");
    this.cartItems = page.locator(".cart-item-row");
    this.cartTotal = page.locator(".product-price.order-total strong");
  }
}
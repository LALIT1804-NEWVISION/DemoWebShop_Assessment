import { Page, Locator } from "@playwright/test";

export class ProductPage {
  page: Page;

  readonly booksCategory: Locator;
  readonly firstProduct: Locator;
  readonly products: Locator;
  readonly addToCartBtn: Locator;
  readonly addToWishlistBtn: Locator;
  readonly sortDropdown: Locator;
  readonly productsName: Locator;
  //readonly compareButtons: Locator;
  readonly successNotification: Locator;
  readonly compareTable: Locator;
  readonly cartCount: Locator;
  readonly addtoCompareBtn: Locator;
  readonly Categorylink: (category: string) => Locator;


  constructor(page: Page) {
    this.page = page;
    this.booksCategory = page.locator(".top-menu").getByRole("link", { name: "Books" });
    this.firstProduct = page.locator(".product-item h2 a").first();
    this.products = page.locator(".product-item h2 a");
    this.addToCartBtn = page.locator('[class="button-1 add-to-cart-button"]');
    this.addToWishlistBtn = page.locator("input[value='Add to wishlist']");
    this.sortDropdown = page.locator("#products-orderby");
    this.productsName = page.locator(".product-item .product-title a");
    //this.compareButtons = page.locator(".add-to-compare-list-button");
    this.addtoCompareBtn = page.locator('//input[@value="Add to compare list"]');
    this.successNotification = page.locator(".bar-notification.success");
    this.compareTable = page.locator(".compare-products-table");
    this.cartCount = page.locator("#topcartlink .cart-qty");
    this.Categorylink = (category: string) => this.page.locator(`//div[contains(@class,'block-category-navigation')]//a[normalize-space()='${category}']`);

  }
}
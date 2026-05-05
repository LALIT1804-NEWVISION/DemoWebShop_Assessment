import { expect, Page } from "@playwright/test";
import { ProductPage } from "../Pages/productpage";


export class ProductAction {
  productPage: ProductPage;

  constructor(page: Page) {
    this.productPage = new ProductPage(page);
  }

  // ================= BASIC FLOWS =================

  async openBooksCategory() {
    await this.productPage.booksCategory.click();
  }

  async openFirstProduct() {
    await this.productPage.firstProduct.click();
  }

  async addToCart() {
    await this.productPage.addToCartBtn.click();
    await this.productPage.successNotification.waitFor();
  }

  async verifyAddToCartSuccess() {
    await expect(this.productPage.successNotification)
      .toContainText("added");
  }

  async verifyCartCountUpdated() {
    await expect(this.productPage.cartCount).toBeVisible();
    await expect(this.productPage.cartCount).not.toHaveText("(0)");
  }

  // ================= WISHLIST FLOW =================

  async addWishlistFromProductList() {

    const allproducts = this.productPage.products;
    const count = await allproducts.count();

    for (let i = 0; i < count; i++) {

      const product = this.productPage.products.nth(i);

      await product.click();
      await this.productPage.page.waitForLoadState("domcontentloaded");

      const wishlistBtn = this.productPage.addToWishlistBtn;
      if (await wishlistBtn.isVisible()) {
        await wishlistBtn.click();
        await this.productPage.page.waitForTimeout(1000);
        break;
      }
      await this.productPage.page.goBack();
      await this.productPage.page.waitForLoadState("domcontentloaded");
    }
  }

  // ================= SORT =================

  async verifyBooksPageLoaded() {
    await expect(this.productPage.page).toHaveURL(/books/);
  }

  async verifySortDropdownVisible() {
    const dropdown = this.productPage.sortDropdown;
    await expect(dropdown).toBeVisible();
  }

  async sortByNameAToZ() {
    const dropdown = this.productPage.sortDropdown;

    await expect(dropdown).toBeVisible();

    await dropdown.selectOption({ label: "Name: A to Z" });
  }

  async sortByPriceLowToHigh() {
    const dropdown = this.productPage.page.locator("#products-orderby");

    await expect(dropdown).toBeVisible();

    await dropdown.selectOption({ label: "Price: Low to High" });
  }

  async verifyProductsSortedAZ() {
    const products = this.productPage.productsName;

    await products.first().waitFor({ state: "visible" });

    const titles = await products.evaluateAll(nodes =>
      nodes.map(n => n.textContent?.trim() || "")
    );

    const sorted = [...titles].sort((a, b) =>
      a.localeCompare(b)
    );

    expect(titles).toEqual(sorted);
  }

  async verifySortUrlUpdated() {
    await expect(this.productPage.page).toHaveURL(/orderby/);
  }

  // ================= COMPARE =================

  async verifyProductsVisible() {
    await expect(this.productPage.products.first()).toBeVisible();
  }

  async addProductsToCompareFlow(category: string, maxProducts = 2) {
    await this.productPage.Categorylink(category).click();
    await expect(this.productPage.page).toHaveURL(/demowebshop\.tricentis\.com\/.+/);
    const products = this.productPage.products;
    await expect(products.first()).toBeVisible();
    const count = await products.count();
    expect(count).toBeGreaterThan(0);
    let addedProducts = 0;
    for (let i = 0; i < count; i++) {
      await products.nth(i).click();
      const compareBtn = this.productPage.addtoCompareBtn;
      await compareBtn.waitFor({ state: 'visible', timeout: 5000 });
      if (await compareBtn.isVisible()) {
        await compareBtn.click();
        addedProducts++;
        console.log(`Product ${addedProducts} added to compare`);
        if (addedProducts === maxProducts) break;
      }
      await this.productPage.page.goBack();
      await this.productPage.page.waitForLoadState('domcontentloaded');
    }
    expect(addedProducts).toBe(maxProducts);
    await this.productPage.page.getByRole('link', { name: /compare products/i }).click();
    await expect(this.productPage.page).toHaveURL(/compareproducts/);
  }

  async openComparePage() {
    await this.productPage.page.goto("https://demowebshop.tricentis.com/compareproducts");
  }

  async verifyCompareProducts() {
    await expect(this.productPage.compareTable).toBeVisible();
  }
}
import { expect, Page } from "@playwright/test";
import { CheckoutPage } from "../Pages/checkoutPage";

export class CheckoutAction {
  checkoutPage: CheckoutPage;

  constructor(page: Page) {
    this.checkoutPage = new CheckoutPage(page);
  }
  async acceptTerms() {
    await this.checkoutPage.termsCheckbox.check();
  }

  async clickCheckout() {
    await this.checkoutPage.checkoutBtn.click();
  }

  async fillBillingDetails() {
    await this.checkoutPage.AddressDropdown.click();
    await this.checkoutPage.cityInput.fill("New York");
    await this.checkoutPage.addressInput.fill("123 Test Street");
    await this.checkoutPage.zipInput.fill("10001");
    await this.checkoutPage.phoneInput.fill("1234567890");
  }

  async verifyOrderSuccess() {
    await expect(
      this.checkoutPage.page.locator(".section.order-completed")).toContainText("Thank you");
  }
}
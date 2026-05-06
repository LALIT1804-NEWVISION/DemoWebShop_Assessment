import { expect, Page } from "@playwright/test";
import { CheckoutPage } from "../Pages/checkoutPage";
import CheckoutData  from "../Testdata/checkout.json";

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

  async SelectBillingAddressDropdown() {
    await this.checkoutPage.AddressDropdown.click();
    await this.checkoutPage.AddressDropdown.selectOption({ label: "New Address" });
  }

  async fillBillingDetails() {
    await this.checkoutPage.countryDropdown.selectOption(CheckoutData.billingDetails.countryId);
    await this.checkoutPage.cityInput.fill(CheckoutData.billingDetails.city);
    await this.checkoutPage.addressInput.fill(CheckoutData.billingDetails.address);
    await this.checkoutPage.zipInput.fill(CheckoutData.billingDetails.zip);
    await this.checkoutPage.phoneInput.fill(CheckoutData.billingDetails.phone);
  }

  async completeCheckoutFlow() {
    await this.checkoutPage.billingNextBtn.click();
    await this.checkoutPage.shippingAddressNextBtn.click();
    await this.checkoutPage.shippingMethodNextBtn.click();
    await this.checkoutPage.paymentMethodNextBtn.click();
    await this.checkoutPage.paymentInfoNextBtn.click();
    await this.checkoutPage.confirmOrderBtn.click();
  }

  async verifyOrderSuccess() {
    await expect(this.checkoutPage.page.locator(".section.order-completed")).toContainText("Your order has been successfully processed!");
  }
}
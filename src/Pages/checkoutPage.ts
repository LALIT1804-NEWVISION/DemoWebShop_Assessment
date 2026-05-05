import { Page, Locator } from "@playwright/test";

export class CheckoutPage {
  page: Page;
  readonly termsCheckbox: Locator;
  readonly checkoutBtn: Locator;
  readonly AddressDropdown: Locator;
  readonly countryDropdown: Locator;
  readonly cityInput: Locator;
  readonly addressInput: Locator;
  readonly zipInput: Locator;
  readonly phoneInput: Locator;
  readonly shippingAddressNextBtn: Locator;
  readonly billingNextBtn: Locator;
  readonly shippingMethodNextBtn: Locator;
  readonly paymentMethodNextBtn: Locator;
  readonly paymentInfoNextBtn: Locator;
  readonly confirmOrderBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.termsCheckbox = page.locator("#termsofservice");
    this.checkoutBtn = page.locator("#checkout");
    this.AddressDropdown = page.locator("//select[@name='billing_address_id']");
    this.countryDropdown = page.locator("#BillingNewAddress_CountryId");
    this.cityInput = page.locator("#BillingNewAddress_City");
    this.addressInput = page.locator("#BillingNewAddress_Address1");
    this.zipInput = page.locator("#BillingNewAddress_ZipPostalCode");
    this.phoneInput = page.locator("#BillingNewAddress_PhoneNumber");
    this.billingNextBtn = page.locator("#billing-buttons-container input");
    this.shippingAddressNextBtn = page.locator("//input[@onclick='Shipping.save()']");
    this.shippingMethodNextBtn = page.locator("#shipping-method-buttons-container input");
    this.paymentMethodNextBtn = page.locator("#payment-method-buttons-container input");
    this.paymentInfoNextBtn = page.locator("#payment-info-buttons-container input");
    this.confirmOrderBtn = page.locator("#confirm-order-buttons-container input");
  }
}
import { test, expect } from "../../src/Fixtures/fixture";
import LoginData from "../../src/Testdata/logindata.json";
import ProductData from "../../src/Testdata/product.json";

test("TC001 User Registration", async ({ appAction }) => {
  await appAction.register.Click_On_RegisterLink();
  await appAction.register.registeration_details();
  await appAction.register.verifyRegistrationSuccessMessage();
});

test("TC002 Valid User Login", async ({ appAction }) => {
  await appAction.login.Click_On_LoginLink();
  await appAction.login.login_details(LoginData.Users.ValidUser);
  await appAction.login.Click_On_LoginButton();
  await appAction.login.verifyValidLogin(LoginData.Users.ValidUser.email);
});


test("TC003 Invalid User Login", async ({ appAction }) => {
  await appAction.login.Click_On_LoginLink();
  await appAction.login.login_details(LoginData.Users.InvalidUser);
  await appAction.login.Click_On_LoginButton();
  await appAction.login.verifyInvalidLogin();
});

test("TC004 Search Product", async ({ appAction }) => {
  await appAction.search.searchProduct(ProductData.searchProduct);
  await appAction.search.verifySearchResults();
});

test("TC005 Add Product to Cart", async ({ appAction }) => {
  await appAction.product.openBooksCategory();
  await appAction.product.openFirstProduct();
  await appAction.product.addToCart();
  await appAction.product.verifyAddToCartSuccess();
  await appAction.product.verifyCartCountUpdated();
});

test("TC006 View Shopping Cart", async ({ appAction }) => {
  await appAction.product.openBooksCategory();
  await appAction.product.openFirstProduct();
  await appAction.product.addToCart();
  await appAction.cart.openCart();
  await appAction.cart.verifyCartItemsVisible();
  await appAction.cart.verifyCartNotEmpty();
  await appAction.cart.verifyProductNameVisible();
  await appAction.cart.verifyProductPriceVisible();
  await appAction.cart.verifyTotalPriceVisible();
});

test("TC007 Remove Item from Cart", async ({ appAction }) => {
  await appAction.product.openBooksCategory();
  await appAction.product.openFirstProduct();
  await appAction.product.addToCart();
  await appAction.cart.openCart();
  await appAction.cart.verifyCartItemsVisible();
  await appAction.cart.removeItem();
  await appAction.cart.verifyCartEmpty();
});

test("TC008 Update Cart Quantity", async ({ appAction }) => {
  await appAction.product.openBooksCategory();
  await appAction.product.openFirstProduct();
  await appAction.product.addToCart();
  await appAction.cart.openCart();
  await appAction.cart.verifyCartItemsVisible();
  await appAction.cart.updateQuantity("3");
  await appAction.cart.verifyUpdatedQuantity("3");
  await appAction.cart.verifyTotalPriceVisible();
});

test("TC009 Browse Categories", async ({ appAction }) => {
  await expect(appAction.home.homePage.topMenu).toBeVisible();
  await appAction.home.verifyCategoriesNavigation();
});

test("TC010 Add to Wishlist", async ({ appAction }) => {
  await appAction.login.Click_On_LoginLink();
  await appAction.login.login_details(LoginData.Users.ValidUser);
  await appAction.login.Click_On_LoginButton();
  await appAction.product.openBooksCategory();
  await appAction.product.addWishlistFromProductList();
  await appAction.wishlist.openWishlist();
  await appAction.wishlist.verifyProductInWishlist();
});

test("TC011 Apply Coupon Code", async ({ appAction }) => {
  await appAction.product.openBooksCategory();
  await appAction.product.openFirstProduct();
  await appAction.product.addToCart();
  await appAction.cart.openCart();
  const beforeTotal = await appAction.cart.getCartTotal();
  await appAction.cart.applyCoupon(ProductData.couponCode);
  await appAction.cart.verifyCouponError();
  const afterTotal = await appAction.cart.getCartTotal();
  await appAction.cart.verifyTotalUnchanged(beforeTotal, afterTotal);
});

test("TC012 Product Sorting", async ({ appAction }) => {
  await appAction.product.openBooksCategory();
  await appAction.product.verifyBooksPageLoaded();
  await appAction.product.verifySortDropdownVisible();
  await appAction.product.sortByNameAToZ();
  await appAction.product.verifyProductsSortedAZ();
  await appAction.product.sortByPriceLowToHigh();
  await appAction.product.verifySortUrlUpdated();
});

test("TC013 Newsletter Subscription", async ({ appAction }) => {
  await appAction.home.subscribeNewsletter(LoginData.Users.ValidUser.email);
  await appAction.home.verifyNewsletterSuccess();
});

test("TC014 Product Comparison", async ({ appAction }) => {
  await appAction.product.openBooksCategory();
  await appAction.product.verifyProductsVisible();
  await appAction.product.addProductsToCompareFlow(ProductData.category);
  await appAction.product.openComparePage();
  await appAction.product.verifyCompareProducts();
});


test("TC015 Complete Checkout", async ({ appAction }) => {
  await appAction.login.Click_On_LoginLink();
  await appAction.login.login_details(LoginData.Users.ValidUser);
  await appAction.login.Click_On_LoginButton();
  await appAction.product.openBooksCategory();
  await appAction.product.openFirstProduct();
  await appAction.product.addToCart();
  await appAction.cart.openCart();
  await appAction.checkout.acceptTerms();
  await appAction.checkout.clickCheckout();
  await appAction.checkout.SelectBillingAddressDropdown();
  await appAction.checkout.fillBillingDetails();
  await appAction.checkout.completeCheckoutFlow();
  await appAction.checkout.verifyOrderSuccess();
});
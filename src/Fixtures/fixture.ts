import { test as base, expect, Page } from '@playwright/test';
import { RegisterationAction } from '../Actions/registerationAction';
import { LoginAction } from '../Actions/loginAction';
import { SearchAction } from '../Actions/searchAction';
import { ProductAction } from '../Actions/productAction';
import { CartAction } from '../Actions/cartAction';
import { HomeAction } from '../Actions/homeAction';
import { WishlistAction } from '../Actions/wishlistAction';
import { CheckoutAction } from '../Actions/checkoutAction';
import RegisterationData from "../../src/Testdata/registerationdata.json";



type AppActions = {
    register: RegisterationAction;
    login: LoginAction;
    search: SearchAction;
    product: ProductAction;
    cart: CartAction;
    home: HomeAction;
    wishlist: WishlistAction;
    checkout: CheckoutAction;
};

type Fixtures = {
    gotoBaseUrl: void;
    appAction: AppActions;
};


export const test = base.extend<Fixtures>({


    gotoBaseUrl: [
        async ({ page }, use) => {
            await page.goto(RegisterationData.baseUrl);
            await expect(page).toHaveURL(RegisterationData.baseUrl);
            await use();
        },
        { auto: true },
    ],

    appAction: async ({ page }, use) => {

        const appAction: AppActions = {
            register: new RegisterationAction(page),
            login: new LoginAction(page),
            search: new SearchAction(page),
            product: new ProductAction(page),
            cart: new CartAction(page),
            home: new HomeAction(page),
            wishlist: new WishlistAction(page),
            checkout: new CheckoutAction(page),
        };

        await use(appAction);
    },
});

export { expect } from "@playwright/test";


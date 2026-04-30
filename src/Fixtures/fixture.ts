import { test as base, expect } from '@playwright/test';
import { RegisterationAction } from '../../src/Actions/1_registerationAction';
import { LoginAction } from '../../src/Actions/2_loginAction'
import RegisterationData from "../../src/Testdata/registerationdata.json";


type AppActions = {
    register: RegisterationAction;
    login: LoginAction;
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
            login: new LoginAction(page)
      
    };
        await use(appAction);
    },
});
export { expect } from "@playwright/test";
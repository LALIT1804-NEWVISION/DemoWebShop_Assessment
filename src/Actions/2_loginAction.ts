import { expect } from "@playwright/test";
import { LoginPage } from "../Pages/2_loginpage ";
import LoginData from "../../src/Testdata/logindata.json";

type LoginData = {
    email: string;
    password: string;
};

export class LoginAction {
    readonly loginPage: LoginPage;

    constructor(page: any) {
        this.loginPage = new LoginPage(page);
    }

    async Click_On_LoginLink() {
        await this.loginPage.loginLink.click();
    }

    async login_details(data: LoginData) {
        await this.loginPage.emailField.fill(data.email);
        await this.loginPage.passwordField.fill(data.password);
    }

    async Click_On_LoginButton() {
        await this.loginPage.loginButton.click();
    }

    async verifyValidLogin(email: string) {
        await expect(this.loginPage.accountEmail).toContainText(email);
        await expect(this.loginPage.logoutLink).toBeVisible();
    }

    async verifyInvalidLogin() {
        await expect(this.loginPage.invaliderrorMessage).toBeVisible();
        await expect(this.loginPage.page).toHaveURL(/.*login/);
    }
}
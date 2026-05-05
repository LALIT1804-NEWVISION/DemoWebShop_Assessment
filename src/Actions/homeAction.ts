import { expect, Page } from "@playwright/test";
import { HomePage } from "../../src/Pages/homepage";

export class HomeAction {
    homePage: HomePage;

    constructor(page: Page) {
        this.homePage = new HomePage(page);
    }

    async verifyCategoriesNavigation() {

        const categories = [
            "Books",
            "Computers",
            "Electronics",
            "Apparel & Shoes",
        ];

        for (const category of categories) {

            await this.homePage.topMenu.getByRole("link", { name: category }).click();
            await this.homePage.page.waitForLoadState("domcontentloaded");
            await expect(this.homePage.page).toHaveURL(/.*/);
        }
    }
    // ---------------- NEWSLETTER ----------------

    async subscribeNewsletter(email: string) {
        await this.homePage.newsletterInput.scrollIntoViewIfNeeded();
        await this.homePage.newsletterInput.fill(email);
        await this.homePage.subscribeBtn.click();
    }

    async verifyNewsletterSuccess() {
        await expect(this.homePage.newsletterSuccessMsg).toContainText("Thank you");
    }
}
import { Page, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";
import { writeFileSync } from "fs";
import { RegisterationPage } from "../Pages/registerationpage";
import RegisterationData from "../Testdata/registerationdata.json";


type Data = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmpassword: string;
};

export class RegisterationAction {
    readonly registerationPage: RegisterationPage;

    constructor(page: any) {
        this.registerationPage = new RegisterationPage(page);
    }

    async Click_On_RegisterLink() {
        await this.registerationPage.registerLink.click();
    }

    async registeration_details() {
        const randomNumber = faker.number.int({ min: 10000, max: 99999 });
        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();
        const updatedUserData = {
            firstName: firstName,
            lastName: lastName,
            email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${randomNumber}@gmail.com`,
            password: `Test@${randomNumber}`,
            confirmpassword: `Test@${randomNumber}`,
        }

        // Save generated user into JSON array
        const updatedJsonData = {
            ...RegisterationData,
            generatedUserData: [
                ...(Array.isArray(RegisterationData.generatedUserData)
                    ? RegisterationData.generatedUserData
                    : []),
                updatedUserData,
            ],
        };

        writeFileSync(
            "src/Testdata/registerationdata.json",
            JSON.stringify(updatedJsonData, null, 2)
        );

        //Print Random generated Details
        console.log("First Name:", updatedUserData.firstName);
        console.log("Last Name:", updatedUserData.lastName);
        console.log("Email:", updatedUserData.email);
        console.log("Password:", updatedUserData.password);

        await this.registerationPage.genderMale.click();
        await this.registerationPage.firstName.fill(updatedUserData.firstName);
        await this.registerationPage.lastName.fill(updatedUserData.lastName);
        await this.registerationPage.email.fill(updatedUserData.email);
        await this.registerationPage.password.fill(updatedUserData.password);
        await this.registerationPage.confirmPassword.fill(updatedUserData.confirmpassword);
        await this.registerationPage.registerButton.click();
    }

    async verifyRegistrationSuccessMessage() {

        await expect(this.registerationPage.successMessage).toHaveText("Your registration completed");
    }
}
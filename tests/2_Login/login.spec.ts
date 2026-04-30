import { test, expect } from "../../src/Fixtures/fixture";
import LoginData from "../../src/Testdata/logindata.json";

test("TC002 Valid User Login", async ({ appAction }) => {
  // Click Login link
  await appAction.login.Click_On_LoginLink();

  // Enter valid login details
  await appAction.login.login_details(LoginData.Users.ValidUser);

  // Click Login button
  await appAction.login.Click_On_LoginButton();

  // Verify account email visible
  await appAction.login.verifyValidLogin(LoginData.Users.ValidUser.email);
});

test("TC003 Invalid User Login", async ({ appAction }) => {
  // Click Login link
  await appAction.login.Click_On_LoginLink();

  // Enter invalid login details
  await appAction.login.login_details(LoginData.Users.InvalidUser);

  // Click Login button
  await appAction.login.Click_On_LoginButton();

  // Verify error message and login page
  await appAction.login.verifyInvalidLogin();
});

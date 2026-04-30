import { test } from "../../src/Fixtures/fixture";

test("TC001 User Registration", async ({ appAction }) => {
  // Click Register link
  await appAction.register.Click_On_RegisterLink();
  // Enter Personal Details
  await appAction.register.registeration_details();
  // Verify success message
  await appAction.register.verifyRegistrationSuccessMessage();
});
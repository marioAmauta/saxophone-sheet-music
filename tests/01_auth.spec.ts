import { test, expect } from "@playwright/test";

import { AppRoutes } from "@/lib/app-routes";

import en from "../messages/en.json";
import { deleteUser } from "./data-access/user";

test.describe("Auth", () => {
  test.describe("Sign Up", () => {
    test("user can sign up and be automatically logged in correctly", async ({ page }) => {
      await deleteUser({ email: newUser.email });
      await page.goto(AppRoutes.homePage);
      const loginButton = page.getByRole("link", { name: en.LoginButton.label });
      await loginButton.click();
      await page.getByRole("link", { name: en.LoginPage.registerLink }).click();
      await page.getByRole("textbox", { name: en.RegisterForm.name.label }).fill(newUser.name);
      await page.getByRole("textbox", { name: en.RegisterForm.email.label }).fill(newUser.email);
      await page.getByRole("textbox", { name: en.RegisterForm.password.label, exact: true }).fill(newUser.password);
      await page
        .getByRole("textbox", { name: en.RegisterForm.confirmPassword.label, exact: true })
        .fill(newUser.password);
      await page.getByRole("button", { name: en.RegisterForm.registerSubmit }).click();
      await page.getByRole("heading", { name: en.HomePage.heroSection.title }).waitFor();
      await expect(loginButton).not.toBeVisible();
    });

    test("user cannot sign up with invalid data", async ({ page }) => {
      await page.goto(AppRoutes.homePage);
      const loginButton = page.getByRole("link", { name: en.LoginButton.label });
      await loginButton.click();
      await page.getByRole("link", { name: en.LoginPage.registerLink }).click();
      const signUpButton = page.getByRole("button", { name: en.RegisterForm.registerSubmit });
      await signUpButton.click();
      await expect(page.getByText(en.RegisterForm.name.errorMessage)).toBeVisible();
      await expect(page.getByText(en.RegisterForm.email.errorMessage)).toBeVisible();
      await expect(page.getByText(en.RegisterForm.password.errorMessage).first()).toBeVisible();
      await expect(page.getByText(en.RegisterForm.password.errorMessage).nth(1)).toBeVisible();
      await page.getByRole("textbox", { name: en.RegisterForm.name.label }).fill(newUser.name);
      await page.getByRole("textbox", { name: en.RegisterForm.email.label }).fill(newUser.email);
      await page.getByRole("textbox", { name: en.RegisterForm.password.label, exact: true }).fill(newUser.password);
      const confirmPasswordInput = page.getByRole("textbox", {
        name: en.RegisterForm.confirmPassword.label,
        exact: true
      });
      await confirmPasswordInput.fill(newUser.password);
      signUpButton.click();
      await expect(page.getByText(en.RegisterForm.email.alreadyUsedEmail)).toBeVisible();
      await confirmPasswordInput.fill(newUserErrorData.confirmPassword);
      await expect(page.getByText(en.RegisterForm.confirmPassword.errorMatchMessage)).toBeVisible();
    });
  });

  test.describe("Login", () => {
    test("user can login and log out after signing up", async ({ page }) => {
      await page.goto(AppRoutes.homePage);
      const loginButton = page.getByRole("link", { name: en.LoginButton.label });
      await loginButton.click();
      await page.getByRole("textbox", { name: en.LoginForm.email.label }).fill(newUser.email);
      await page.getByRole("textbox", { name: en.LoginForm.password.label }).fill(newUser.password);
      await page.getByRole("button", { name: en.LoginForm.loginSubmit, exact: true }).click();
      await page.getByRole("heading", { name: en.HomePage.heroSection.title }).waitFor();
      await expect(loginButton).not.toBeVisible();
      await page.getByRole("navigation").getByRole("button").click();
      await page.getByRole("button", { name: en.LogOutButton.logOutLabel }).click();
      await page.getByRole("button", { name: en.LogOutButton.logOutLabel }).click();
      await expect(loginButton).toBeVisible();
    });

    test("user cannot login with invalid credentials", async ({ page }) => {
      await page.goto(AppRoutes.homePage);
      const loginButton = page.getByRole("link", { name: en.LoginButton.label });
      await loginButton.click();
      const loginSubmitButton = page.getByRole("button", { name: en.LoginForm.loginSubmit, exact: true });
      const emailInput = page.getByRole("textbox", { name: en.LoginForm.email.label });
      await emailInput.fill(newUserErrorData.emailInvalid);
      await loginSubmitButton.click();
      await expect(page.getByText(en.LoginForm.email.errorMessage)).toBeVisible();
      await expect(page.getByText(en.LoginForm.password.errorMessage)).toBeVisible();
      await emailInput.fill(newUserErrorData.email);
      await page.getByRole("textbox", { name: en.LoginForm.password.label }).fill(newUserErrorData.password);
      await loginSubmitButton.click();
      await expect(page.getByText(en.LoginForm.invalidCredentials)).toBeVisible();
    });
  });
});

const newUser = {
  name: "Mario",
  email: "mariodevcl@gmail.com",
  password: "hello-sax"
};

const newUserErrorData = {
  name: "Esteban",
  email: "wena@gmail.com",
  emailInvalid: "wena@gmail",
  password: "wenawena",
  confirmPassword: "hello-sax2"
};

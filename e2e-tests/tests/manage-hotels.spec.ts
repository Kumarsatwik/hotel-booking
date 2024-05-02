import { test, expect } from "@playwright/test";
import path from "path";

const UI_URL = "http://localhost:5173";

test.beforeEach(async ({ page }) => {
  await page.goto(UI_URL);
  // Get the sign in button
  await page.getByRole("link", { name: "Sign In" }).click();
  await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible();
  await page.locator("[name=email]").fill("abc@gmail.com");
  await page.locator("[name=password]").fill("123456");
  await page.getByRole("button", { name: "Login" }).click();
  await expect(page.getByText("Sign in Successful!")).toBeVisible();
});

test("should allow user to add a hotel", async ({ page }) => {
  await page.goto(`${UI_URL}/add-hotel`);

  await page.locator('[name="name"]').fill("Marine Hotel");
  await page.locator('[name="city"]').fill("Mumbai");
  await page.locator('[name="country"]').fill("India");
  await page.locator('[name="description"]').fill("Test Hotel Description");
  await page.locator('[name="pricePerNight"]').fill("100");
  await page.selectOption('select[name="starRating"]', "3");
  await page.getByText("Adventure").click();
  await page.getByLabel("Free WiFi").check();
  await page.getByLabel("Parking").check();
  await page.getByLabel("Restaurant").check();

  await page.locator('[name="adultCount"]').fill("2");
  await page.locator('[name="childCount"]').fill("4");

  await page.setInputFiles('[name="imageFile"]', [
    path.join(__dirname, "files", "hotel1.jpg"),
    path.join(__dirname, "files", "hotel2.jpg"),
    path.join(__dirname, "files", "hotel3.jpg"),
  ]);

  await page.getByRole("button", { name: "Save" }).click();
  await expect(page.getByText("Hotel Saved!")).toBeVisible();
});

test("should display hotels", async ({ page }) => {
  await page.goto(`${UI_URL}/my-hotel`);
  await expect(page.getByText("Marine")).toBeVisible();
});

test("should edit hotel", async ({ page }) => {
  await page.goto(`${UI_URL}/my-hotel`);
  await page.getByRole("link", { name: "View Details" }).click();
  await page.waitForSelector('[name="name"]', { state: "attached" });
  await expect(page.locator('[name="name"]')).toHaveValue("Marine Hotel");
  await page.locator('[name="name"]').fill("Marine");
  await page.getByRole("button", { name: "Save" }).click();
  await expect(page.getByText("Hotel Updated!")).toBeVisible();
  await page.reload();
  await expect(page.locator('[name="name"]')).toHaveValue("Marine");
  await page.locator('[name="name"]').fill("Marine Hotel");
  await page.getByRole("button", { name: "Save" }).click();
});

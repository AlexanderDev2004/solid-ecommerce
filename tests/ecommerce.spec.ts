import { test, expect } from "@playwright/test";

test.describe("E-Commerce DataMart", () => {
  test("Customer dapat login dan membeli paket", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText("Login")).toBeVisible();

    await page.fill('input[placeholder="Username"]', "dedy");
    await page.fill('input[placeholder="Password"]', "123456");
    await page.click('button:has-text("Masuk")');

    await expect(page.getByText("Pilih Paket Internet")).toBeVisible();

    // Pasang listener SEBELUM klik
    const dialogPromise = page.waitForEvent("dialog");
    await page.click('text=Beli Paket');
    const dialog = await dialogPromise;
    expect(dialog.message()).toContain("Berhasil membeli");
    await dialog.dismiss();
  });

  test("Admin dapat login dan CRUD paket", async ({ page }) => {
    await page.goto("/");
    await page.fill('input[placeholder="Username"]', "alex");
    await page.fill('input[placeholder="Password"]', "123456");
    await page.click('button:has-text("Masuk")');

    await expect(page.getByText("Kelola Paket Data")).toBeVisible();

    // Tambah paket
    await page.fill('input[placeholder="Nama paket"]', "Paket Test");
    await page.fill('input[placeholder="Harga"]', "99999");
    await page.click('button:has-text("Tambah")');

    await expect(page.getByText("Paket Test")).toBeVisible();

    // Hapus paket
    const dialogPromise = page.waitForEvent("dialog");
    await page.click('button:has-text("Hapus")');
    const dialog = await dialogPromise;
    await dialog.accept();

    // Tunggu 1 detik untuk sinkronisasi json-server
    await page.waitForTimeout(1000);

    await expect(page.getByText("Paket Test")).not.toBeVisible();
  });
});

import { test, expect } from "@playwright/test";

test.describe("E-Commerce DataMart", () => {
  test.setTimeout(60000); //  tambahan waktu maksimal 60 detik

  test("Customer dapat login dan membeli paket", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText("Login")).toBeVisible();

    await page.fill('input[placeholder="Username"]', "dedy");
    await page.fill('input[placeholder="Password"]', "123456");
    await page.click('button:has-text("Masuk")');

    await expect(page.getByText("Pilih Paket Internet")).toBeVisible();

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

    // Hapus paket yang baru ditambahkan
    const dialogPromise = page.waitForEvent("dialog");
    await page.locator('tr:has-text("Paket Test") button:has-text("Hapus")').click();
    const dialog = await dialogPromise;
    await dialog.accept();

    // Tunggu perubahan tersimpan
    await page.waitForTimeout(1500);

    await expect(page.getByText("Paket Test")).not.toBeVisible();
  });
});

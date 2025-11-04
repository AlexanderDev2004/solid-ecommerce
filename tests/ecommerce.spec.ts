import { test, expect } from "@playwright/test";

test.describe("E-Commerce DataMart", () => {
  test.beforeEach(async () => {
    // Reset database sebelum setiap test
    const res = await fetch("http://localhost:5000/reset", { method: "POST" });
    if (!res.ok) console.warn("⚠️ Reset API belum diaktifkan, lanjut test...");
  });

  test("Customer dapat login dan membeli paket", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText("Login")).toBeVisible();

    await page.fill('input[placeholder="Username"]', "dedy");
    await page.fill('input[placeholder="Password"]', "123456");
    await page.click('button:has-text("Masuk")');

    await expect(page.getByText("Pilih Paket Internet")).toBeVisible();

    // Klik beli paket pertama
    await page.click('text=Beli Paket');
    page.once("dialog", async (dialog) => {
      expect(dialog.message()).toContain("Berhasil membeli");
      await dialog.dismiss();
    });
  });

  test("Admin dapat login dan CRUD paket", async ({ page }) => {
    await page.goto("/");
    await page.fill('input[placeholder="Username"]', "alex");
    await page.fill('input[placeholder="Password"]', "123456");
    await page.click('button:has-text("Masuk")');

    await expect(page.getByText("Kelola Paket Data")).toBeVisible();

    await page.fill('input[placeholder="Nama paket"]', "Paket Test");
    await page.fill('input[placeholder="Harga"]', "99999");
    await page.click('button:has-text("Tambah")');
    await expect(page.getByText("Paket Test")).toBeVisible();

    page.once("dialog", async (dialog) => await dialog.accept());
    await page.click('button:has-text("Hapus")');

    await expect(page.getByText("Paket Test")).not.toBeVisible();
  });
});

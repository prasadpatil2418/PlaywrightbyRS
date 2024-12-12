import { test, expect } from '@playwright/test';

// test.use({storageState:{ cookies: [], origins: [] }})

test.describe("Session storage",()=>{



    test('test @Smoke', async ({ page }) => {
         //await context.clearCookies(); //if dont want to use cookies
        //  const context = await browser.newContext({storageState:'user.json'})
        //  const page = await context.newPage()
         await page.goto('https://www.saucedemo.com/inventory.html');
         await expect(page.locator('[data-test="title"]')).toBeVisible();
         await page.locator('[data-test="item-4-title-link"]').click();
         await page.close()
    });

})

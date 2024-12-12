const { chromium , expect } = require("@playwright/test");

module.exports = async config =>{

    const browser = await chromium.launch({headless:true})
    const page = await browser.newPage()
    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="login-credentials"]').click();
    await page.locator('[data-test="username"]').click();
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').click();
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    await expect(page.locator('[data-test="title"]')).toBeVisible();
    await page.context().storageState({path:'user.json'})
    await browser.close()

}


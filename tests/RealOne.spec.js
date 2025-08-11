import { test, expect } from '@playwright/test';

test.only('Positive Test', async ({ page }) => {
  await page.goto('https://bolt.playrealbrokerage.com/register');

  await page.fill("input[name='firstName']",'Jhon');
  await page.fill("input[name='lastName']",'Deo');
  await page.fill("input[name='username']",'Jhon4444');
  await page.fill("input[name='emailAddress']",'Jhon4444@getMaxListeners.com');
  await page.click("input#mantine-sgkg14x7n")
  await page.locator("div#mantine-sgkg14x7n-0").click();
  await page.fill("input[name='password']",'Jhon44445');
  await page.fill("input[name='confirmPassword']",'Jhon@deo#4445');
  await page.click("input#mantine-ddc9ehm8b")
  await page.click("input#mantine-q7xcif645")
  await page.click('button[type="submit"]')
  await expect(page.locator("span.ml-3.text-sm.font-primary-regular.whitespace-nowrap.pt-1.text-dark")).toHaveText("Create Account")
});
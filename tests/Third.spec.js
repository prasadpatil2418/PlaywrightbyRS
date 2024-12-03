import { test, expect } from '@playwright/test';
 
test('Playwright Special locators', async ({ page }) => {
  
    await page.goto("https://rahulshettyacademy.com/angularpractice/");

    //getByLabel is used if tag name is label(text clickable)
    await page.getByLabel("Check me out if you Love IceCreams!").click();// check box
    await page.getByLabel("Employed").check();// radio button
    await page.getByLabel("Gender").selectOption("Female");// select dropdown

   // getByPlaceholder is used with placeholder attribute(to enter values in placeholder)
    await page.getByPlaceholder("Password").fill("abc123");

    // getByRole is used with link, button, anchor tags (in class, tags)
    await page.getByRole("button", {name: 'Submit'}).click();

    // getByText is used with visible text
   const textMsg= await page.getByText("Success! The Form has been submitted successfully!.").isVisible();
   await expect(textMsg).toBeTruthy()
    await page.getByRole("link",{name : "Shop"}).click();

    // hasText is used to filterout the element from the group of elements  
    await page.locator("app-card",{hasText: 'Nokia Edge'}).getByRole("button").click();
 
});


test('@Webst Client App login', async ({ page }) => {
    //js file- Login js, DashboardPage
    const email = "test2418@gmail.com";
    const productName = 'ZARA COAT 3';
    const products = page.locator(".card-body");
    await page.goto("https://rahulshettyacademy.com/client");
    await page.getByPlaceholder("email@example.com").fill(email);
    await page.getByPlaceholder("enter your passsword").fill("Test@123");
    await page.getByRole('button',{name:"Login"}).click();
    await page.waitForLoadState('networkidle');
    await page.locator(".card-body b").first().waitFor();
    
    //chaining of locators
    await page.locator(".card-body", {hasText:"ZARA COAT 3"})
    .getByRole("button",{name:"Add to Cart"}).click();
  
    //listitem  - li tag elements
    await page.getByRole("listitem").getByRole('button',{name:"Cart"}).click();
  
    //await page.pause();
    await page.locator("div li").first().waitFor();
    await expect(page.getByText("ZARA COAT 3")).toBeVisible();
   
    await page.getByRole("button",{name :"Checkout"}).click();
  
    await page.getByPlaceholder("Select Country").pressSequentially("ind");

    //click on second(1 index) button with name= India.
    await page.getByRole("button",{name :"India"}).nth(1).click();
    //await page.getByRole('button',{name: "Place Order"}).click()
    await page.getByText("PLACE ORDER").click();
    await expect(page.getByText("Thankyou for the order.")).toBeVisible();
})
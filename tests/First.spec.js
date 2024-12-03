const {test, expect} = require('@playwright/test');

//test.use({ browserName: 'webkit'});
test.only('@Web Browser Context-Validating Error login', async ({browser})=>
    {
         const context = await browser.newContext();
         const page =  await context.newPage();
       // page.route('**/*.{jpg,png,jpeg}',route=> route.abort());
         const userName = page.locator('#username');
         const passWord = page.locator("[type='password']")
         const signIn = page.locator("#signInBtn");
         const cardTitles =  page.locator(".card-body a");
        // page.on('request',request=> console.log(request.url()));
        // page.on('response',response=> console.log(response.url(), response.status()));
         await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
         console.log(await page.title());
         //css 
        await userName.fill("rahulshetty");
        await passWord.fill("learning");
        await signIn.click();
       console.log(await page.locator("[style*='block']").textContent()); //error message
       await expect(page.locator("[style*='block']")).toContainText('Incorrect');
       await page.waitForTimeout(3000)
       //type - fill
       await userName.fill("");
       await userName.fill("rahulshettyacademy");
       await signIn.click();
       console.log(await cardTitles.first().textContent());
      console.log(await cardTitles.nth(1).textContent());
      await page.waitForLoadState('networkidle');// The promise resolves after 'load' event.
      await cardTitles.first().waitFor();
      const allTitles = await cardTitles.allTextContents();
      console.log(allTitles);
    });
    
   
    test('@Web UI Controls', async ({page})=>
    {
       await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
       const userName = page.locator('#username');
       const signIn = page.locator("#signInBtn");
       const documentLink = page.locator("[href*='documents-request']");
       const dropdown = page.locator("select.form-control");
       await dropdown.selectOption("consult"); // select dropdown 
       await page.locator(".radiotextsty").last().click();//select radio button
       await page.locator("#okayBtn").click();// JS pop up
       console.log(await page.locator(".radiotextsty").last().isChecked());
       await expect(page.locator(".radiotextsty").last()).toBeChecked();
       await page.locator("#terms").click(); //select checkbox
       await expect( page.locator("#terms")).toBeChecked();
       await page.locator("#terms").uncheck();
       expect( await page.locator("#terms").isChecked()).toBeFalsy();
       await expect(documentLink).toHaveAttribute("class","blinkingText");
    });
   
    
   
    test('@Child windows hadle', async ({browser})=>
    {
       const context = await browser.newContext();
       const page =  await context.newPage();
       const userName = page.locator('#username');
       await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
       const documentLink = page.locator("[href*='documents-request']");
   
       const newPage =Promise.all(
      [
         context.waitForEvent('page'),//listen for any new page pending,rejected,fulfilled
         documentLink.click(),
      
      ])//new page is opened

      await page.pause()
    })
const {test,expect} = require('@playwright/test')
 
class orderReview {

    constructor(page){
        this.page = page
        this.country = page.locator("[placeholder*='Country']")
        this.dropdown = page.locator(".ta-results")
        this.emailId = page.locator(".user__name [type='text']").first()
        this.submit =  page.locator(".action__submit")
        this.confirmationTxt = page.locator(".hero-primary")
        this.orderId = page.locator(".em-spacer-1 .ng-star-inserted")

    }

    async searchCountryAndSelect(countryCode,countryName){

        await this.country.pressSequentially(countryCode);
  
   await this.dropdown.waitFor();// wait till dropdown load
   const optionsCount = await this.dropdown.locator("button").count();
   for (let i = 0; i < optionsCount; ++i) {
      const text = await this.dropdown.locator("button").nth(i).textContent();
      if (text.trim() === countryName) {  
         await this.dropdown.locator("button").nth(i).click();
         break;
      }
   }
    }

    async VerifyEmail(username){
        expect(this.emailId).toHaveText(username);

    }
    async SubmitAndGetOrderId(){

        await this.submit.click();
    }

    async orderIdGet(){
        await expect(this.confirmationTxt).toHaveText(" Thankyou for the order. ");
      
         return await this.orderId.textContent();

    }
        
    
}
module.exports ={orderReview};
const{test, expect} = require('@playwright/test')

class CartPage {

    constructor(page){

        this.page =page
        this.CartProduct = page.locator("div li").first()
        this.Checkout = page.locator("text=Checkout")
    }

    async VerifyProductIsDisplayed(productName){
    await this.CartProduct.waitFor();// wait till page load
    const bool = await this.getProductLocator(productName).isVisible();
    expect(bool).toBeTruthy();
    await this.Checkout.click();
    }

    getProductLocator(productName)
{
    return  this.page.locator("h3:has-text('"+productName+"')");
}
}
module.exports ={CartPage}
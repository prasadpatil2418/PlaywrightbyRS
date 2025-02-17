class DashBoard {

    constructor(page){

        this.page = page;
        this.products = page.locator(".card-body");
        this.productText= page.locator(".card-body b")
        this.cart = page.locator("[routerlink*='cart']")
        //this.cart = page.locator ("[routerlink*=\'cart\']")
       
    }

   async searchProductAddCart(productName){

        const titles = await this.productText.allTextContents();
         console.log(titles); 
   const count = await this.products.count();
   for (let i = 0; i < count; ++i) {
      if (await this.products.nth(i).locator("b").textContent() === productName) { // chaining of locator
         //add to cart
         await this.products.nth(i).locator("text= Add To Cart").click();
         break;
      }
   }
 }

   async navigateToOrders(){

    await this.cart.click();

    }
}
module.exports = {DashBoard};
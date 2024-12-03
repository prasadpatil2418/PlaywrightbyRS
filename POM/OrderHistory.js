class OrderHistory {

    constructor(page){
        this.page = page
        this.orders = page.locator("button[routerlink*='myorders']")
    
        this.orderTable = page.locator("tbody")
        this.rows = page.locator("tbody tr")
        this.orderIdDetails = page.locator(".col-text")

    }

    async navigateToOrders(){
        await this.orders.click();
    }

    async searchOrderAndSelect(orderId){

        await  this.orderTable.waitFor(); // wait till page load
   
   for (let i = 0; i < await this.rows.count(); ++i) {
      const rowOrderId = await this.rows.nth(i).locator("th").textContent();
      if (orderId.includes(rowOrderId)) {
         await this.rows.nth(i).locator("button").first().click();
         break;
      }
   }
    }
   async getOrderId (){
       return await this.orderIdDetails.textContent();
    
   }
}

module.exports ={OrderHistory}
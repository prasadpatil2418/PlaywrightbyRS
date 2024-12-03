const { test, expect } = require('@playwright/test');
import { LoginPage } from '../POM/LoginPage';
import { DashBoard } from '../POM/DashBoard';
import { CartPage } from '../POM/CartPage';
import { orderReview } from '../POM/OrderReview';
import { OrderHistory } from '../POM/OrderHistory';

//Json->string->js object
//JSON.stringify : Json->string
//JSON.parse: string->js object
const dataSet = JSON.parse(JSON.stringify(require ("../Utils/POMDataParameterization.json")))


for(const data of dataSet){

test(`Client App log for ${data.productName}`, async ({ page }) => {
   
   //Login
   const login = new LoginPage(page)// creating object for class
   await login.goTO();
   await login.validLogin(data.username,data.password);

  //DashBoard
  const dashboard = new DashBoard(page)
  await dashboard.searchProductAddCart(data.productName)
  await dashboard.navigateToOrders()

  //CartPage
   const cartpage = new CartPage(page)
   await cartpage.VerifyProductIsDisplayed(data.productName)

// OrderReview 
   const orderreview = new orderReview(page)
   await orderreview.searchCountryAndSelect("ind","India")
   await orderreview.VerifyEmail(data.username)
   await orderreview.SubmitAndGetOrderId() 
   const orderId = await orderreview.orderIdGet();
   console.log(orderId);

   // orderhistory
  const orderhistory = new OrderHistory(page)
  await orderhistory.navigateToOrders()
  await orderhistory.searchOrderAndSelect(orderId)
  expect(orderId.includes(await orderhistory.getOrderId())).toBeTruthy();

})
}

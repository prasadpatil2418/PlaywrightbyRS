const { test, expect } = require('@playwright/test');
import { LoginPage } from '../POM/LoginPage';
import { DashBoard } from '../POM/DashBoard';
import { CartPage } from '../POM/CartPage';
import { orderReview } from '../POM/OrderReview';
import { OrderHistory } from '../POM/OrderHistory';


test('Client App login', async ({ page }) => {
   
   const username = "test2418@gmail.com";
   const password ="Test@123"
   const productName = 'ZARA COAT 3';

   //Login
   const login = new LoginPage(page)// creating object for class
   await login.goTO();
   await login.validLogin(username,password);

  //DashBoard
  const dashboard = new DashBoard(page)
  await dashboard.searchProductAddCart(productName)
  await dashboard.navigateToOrders()


  //CartPage
   const cartpage = new CartPage(page)
   await cartpage.VerifyProductIsDisplayed(productName)


// OrderReview 
   const orderreview = new orderReview(page)
   await orderreview.searchCountryAndSelect("ind","India")
   await orderreview.VerifyEmail(username)
   await orderreview.SubmitAndGetOrderId()
   
   const orderId = await orderreview.orderIdGet();
    console.log(orderId);


   // orderhistory
  const orderhistory = new OrderHistory(page)
  await orderhistory.navigateToOrders()
  await orderhistory.searchOrderAndSelect(orderId)
  expect(orderId.includes(await orderhistory.getOrderId())).toBeTruthy();

});

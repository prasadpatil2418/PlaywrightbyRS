const { test, expect } = require('@playwright/test');
import { LoginPage } from '../POM/LoginPage';
import { DashBoard } from '../POM/DashBoard';
import { CartPage } from '../POM/CartPage';
import { orderReview } from '../POM/OrderReview';
import { OrderHistory } from '../POM/OrderHistory';

//Json->string->js object
//JSON.stringify : Json->string
//JSON.parse: string->js object
const dataSet = JSON.parse(JSON.stringify(require ("../Utils/POMTestdata.json")))

test('Client App login', async ({ page }) => {
   
   //Login
   const login = new LoginPage(page)// creating object for class
   await login.goTO();
   await login.validLogin(dataSet.username,dataSet.password);

  //DashBoard
  const dashboard = new DashBoard(page)
  await dashboard.searchProductAddCart(dataSet.productName)
  await dashboard.navigateToOrders()

  //CartPage
   const cartpage = new CartPage(page)
   await cartpage.VerifyProductIsDisplayed(dataSet.productName)

// OrderReview 
   const orderreview = new orderReview(page)
   await orderreview.searchCountryAndSelect("ind","India")
   await orderreview.VerifyEmail(dataSet.username)
   await orderreview.SubmitAndGetOrderId() 
   const orderId = await orderreview.orderIdGet();
   console.log(orderId);

   // orderhistory
  const orderhistory = new OrderHistory(page)
  await orderhistory.navigateToOrders()
  await orderhistory.searchOrderAndSelect(orderId)
  expect(orderId.includes(await orderhistory.getOrderId())).toBeTruthy();

});

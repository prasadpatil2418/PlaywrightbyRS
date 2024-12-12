import {test, request,expect} from "@playwright/test";

let reqContext2;
test.beforeAll("Before All the Test",async()=>{

    reqContext2 = await request.newContext({
        baseURL:"https://restful-booker.herokuapp.com",
        extraHTTPHeaders:{
            Accept:"application/json"
        }
    })
})

//request fixture
test("API Testing Get Practice 1",async({request})=>{

   const resp1 = await  request.get("https://restful-booker.herokuapp.com/booking",{
    headers:{
        Accept:"application/json"
    }
   });
   console.log(await resp1.json());
})

//creating instance for context
test("API Testing Get Practice 2",async()=>{
    const reqContext = await request.newContext({
        baseURL:"https://restful-booker.herokuapp.com",
        extraHTTPHeaders:{
            Accept:"application/json"
        }
    });
   const resp1 = await  reqContext.get("/booking");
   console.log(await resp1.json());
})


test("API Testing Get Practice 3",async()=>{

    const resp1 = await  reqContext2.get("/booking");
    console.log(await resp1.json());
 })

 //using env. variable stored in config.js file
 test("API Testing Get Practice 4",async({request})=>{
    const resp1 = await  request.get("/booking");
    console.log(await resp1.json());
 })

 //passing path parameter
 test("API Testing Get Practice 5",async({request})=>{
    const resp1 = await  request.get("/booking/2");
    console.log(await resp1.json());
 })

//passing query parameter in url
 test("API Testing Get Practice 6",async({request})=>{
    const resp1 = await  request.get("/booking?firstname=John&lastname=Smith");
    console.log(await resp1.json());
 })

 //passing query parameter as object
 test("API Testing Get Practice 7",async({request})=>{
    const resp1 = await  request.get("/booking",{
        params:{
            firstname:"John",
            lastname:"Smith"
        }
    });
    console.log(await resp1.json());
 })

 //assertions 
 test("API Testing Get Practice 8",async({request})=>{
    const resp1 = await  request.get("/booking/2443");
    console.log(await resp1.json());
    expect(resp1.status()).toBe(200); //status code
    expect(resp1.ok()).toBeTruthy();  //status text (only for 200)
    expect(await resp1.json()).toMatchObject({  // response object
        "firstname": "John",
        "lastname": "Smith",
        "totalprice": 111,
        "depositpaid": true,
        "bookingdates": {
            "checkin": "2018-01-01",
            "checkout": "2019-01-01"
        }
        
    })
    const jsonresp= await resp1.json()
    expect( jsonresp.firstname).toEqual("Nick") //validation json response
 })

 
 test("API with UI verification",async({request, page})=>{
    const resp2 = await request.get("https://api.demoblaze.com/entries");
    const jsonresp2 = await resp2.json();
    console.log(jsonresp2.Items[0].title);
    await page.goto("https://www.demoblaze.com/");
    
    await expect(page.getByRole('link', { name: 'Samsung galaxy s6' })).toHaveText(jsonresp2.Items[0].title)
 })
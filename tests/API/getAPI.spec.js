const{test, expect} = require ('@playwright/test')
//const { request } = require('http')

const requestBody = require('../../Utils/postApiData.json');

var bId;

test('Post request using JSON body', async({request})=>{

    const postApiResp= await request.post('https://restful-booker.herokuapp.com/booking',{

        data:{
            "firstname": "Test api fname",
            "lastname": "Test api lname",
            "totalprice": 1000,
            "depositpaid": true,
            "bookingdates": {
                "checkin": "2018-01-01",
                "checkout": "2019-01-01"
            },
            "additionalneeds": "super bowls"
        }
    })

    //status code
    expect(postApiResp.ok()).toBeTruthy()
    expect(postApiResp.status()).toBe(200)

   //JSON response
    const postApiRespBody = await postApiResp.json();
    bId = postApiRespBody.bookingid;
    console.log(postApiRespBody)
     expect(postApiRespBody.booking).toHaveProperty('firstname',"Test api fname" )
     expect(postApiRespBody.booking).toHaveProperty('lastname',"Test api lname" )

   //nested JSON object
   expect(postApiRespBody.booking.bookingdates).toHaveProperty('checkin','2018-01-01'),
   expect(postApiRespBody.booking.bookingdates).toHaveProperty('checkout','2019-01-01')
})

console.log("=====================")

test("GET request", async({request})=>{

    const getApiresp= await request.get(`https://restful-booker.herokuapp.com/booking/${bId}`)

     console.log(getApiresp)
})
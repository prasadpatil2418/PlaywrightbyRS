const{test, expect} = require ('@playwright/test')
//const { request } = require('http')

const requestBody = require('../../Utils/postApiData.json')


test('Post request using JSON body', async({request})=>{

    const postApiResp= await request.post('https://restful-booker.herokuapp.com/booking',{

        data:requestBody
    })

    //status code
    expect(postApiResp.ok()).toBeTruthy()
    expect(postApiResp.status()).toBe(200)

   //JSON response
    const postApiRespBody = await postApiResp.json();
    console.log(postApiRespBody)
     expect(postApiRespBody.booking).toHaveProperty('firstname',"Test api fname" )
     expect(postApiRespBody.booking).toHaveProperty('lastname',"Test api lname" )

   //nested JSON object
   expect(postApiRespBody.booking.bookingdates).toHaveProperty('checkin','2018-01-01'),
   expect(postApiRespBody.booking.bookingdates).toHaveProperty('checkout','2019-01-01')



})
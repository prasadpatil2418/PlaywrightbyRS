import { expect, test } from "@playwright/test";
import ApiJson from "../../Utils/apiData.json";

var bId;

test("API Testing - Pass Request body from JSON For Post Call", async ({request}) => {
  const respPost = await request.post("https://restful-booker.herokuapp.com/booking",
    {
      data: ApiJson.postcalldata,
    }
  );
  const respPostJson = await respPost.json();
  console.log(respPostJson);
  bId = respPostJson.bookingid;

  console.log('===============')

  const respPut = await request.put(`https://restful-booker.herokuapp.com/booking/${bId}`,
    {
      data: ApiJson.putcalldata,
    }
  );
  const respPutJson = await respPut.json();
  console.log(respPutJson)
  expect(respPutJson).toMatchObject(ApiJson.putcalldata);
  expect(respPutJson.firstname).toEqual(ApiJson.putcalldata.firstname);

  console.log('===============')


  const reqPatch = await request.patch(`https://restful-booker.herokuapp.com/booking/${bId}`,
    {
      data: ApiJson.patchcalldata,
  });

  const reqPatchJson = await reqPatch.json()

  console.log(reqPatchJson)
  expect(reqPatch.status()).toBe(200)
  expect(reqPatchJson).toMatchObject(ApiJson.patchcalldata);



})



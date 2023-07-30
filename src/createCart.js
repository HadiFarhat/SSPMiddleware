import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export default function (reqdata) {
  return new Promise((resolve, reject) => {
    let line_items;
    let customer =0;
    if (reqdata.line_items[0].variant_id) {
      line_items = [
        {
          product_id: reqdata.line_items[0].product_id,
          variant_id: reqdata.line_items[0].variant_id, // added variant_id
          quantity: reqdata.line_items[0].quantity,
        },
      ];
    } else {
      line_items = [
        {
          product_id: reqdata.line_items[0].product_id,
          quantity: reqdata.line_items[0].quantity,
        },
      ];
    }
    if (reqdata.line_items[0].customer>0){
      customer = reqdata.line_items[0].customer
    }
    var data = JSON.stringify({
      channel_id: process.env.ChannelId,
      customer_id: customer,
      line_items: line_items,
    });
    //console.log(data)
    var config = {
      method: "post",
      url:
        "https://api.bigcommerce.com/stores/" +
        process.env.STORE_Hash +
        "/v3/carts",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-Auth-Client": process.env.ClientId,
        "X-Auth-Token": process.env.Token,
      },
      data: data,
    };

    console.log(config);
    axios(config)
      .then(function (response) {
        if (response.status === 201) {
          //let Id = response.data.id;
          resolve(JSON.stringify(response.data));
          //console.log(response.data)
          //console.log(JSON.stringify(response.data))
        } else {
          resolve(JSON.stringify(response.data));
          //console.log(response)
        }
      })
      .catch(function (error) {
        reject(error);
      });
  });
}

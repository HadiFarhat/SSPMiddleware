import axios from "axios";
import dotenv from "dotenv";
import getLoginUrl from "./loginurl.js";

dotenv.config();

export default function (reqdata) {
  return new Promise(async (resolve, reject) => {
    const data = "";
    var config = {
      method: "post",
      url:
        "https://api.bigcommerce.com/stores/" +
        process.env.STORE_Hash +
        "/v3/carts/" +
        reqdata.id +
        "/redirect_urls",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-Auth-Client": process.env.ClientId,
        "X-Auth-Token": process.env.Token,
      },
      data: data,
    };

    axios(config)
      .then(async function (response) {
        if (response.data) {
          const clientId = process.env.ClientId; //Bigcommerce API client ID;
          const clientSecret = process.env.Secret; //Bigcommerce client secret";
          const customerId = reqdata.customerId; //Customer that you need to autologin;
          const storeHash = process.env.STORE_Hash; //store hash;
          const storeUrl = process.env.storeUrl; //store url;
          //const checkoutUrl = response.data.data.embedded_checkout_url; //Checkout URL;
          const checkoutUrl = response.data.data.checkout_url; //Checkout URL;
          

          const loginUrl = await getLoginUrl(
            customerId,
            storeHash,
            storeUrl,
            clientId,
            clientSecret,
            checkoutUrl
          );
          console.log(loginUrl)
          resolve(loginUrl);
        } else {
          resolve(JSON.stringify(response.data));
        }
      })
      .catch(function (error) {
        reject(error);
      });
  });
}

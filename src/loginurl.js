import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import request from 'request';

// Get BC store time, then use it to ask for one-time passwordless autologin

function gettime() {
    return new Promise((resolve, reject) => {
        var options = {
            'method': 'GET',
            'url': 'https://api.bigcommerce.com/stores/'+process.env.STORE_Hash+'/v2/time',
            'headers': {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Auth-Client': process.env.ClientId, // BC API client ID
                'X-Auth-Token': process.env.Token // BC API token
            }
        };
        request(options, function (error, response) {
            if (error) reject(error);
            const time = JSON.parse(response.body)["time"];
            //console.log(time);
            resolve(time);
        });
    });
}


export default async function getLoginUrl(customerId, storeHash, storeUrl, clientId, clientSecret, checkoutUrl) {
    var dateCreated = await gettime();
    const payload = {
        "iss": clientId,
        "iat": dateCreated,
        "jti": uuidv4(),
        "operation": "customer_login",
        "store_hash": storeHash,
        "customer_id": customerId,
        "redirect_to": checkoutUrl
    }
    //console.log(payload);
    let token = jwt.sign(payload, clientSecret, {algorithm:'HS256'});
    return `${storeUrl}/login/token/${token}`;
};

import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

export default function(reqdata) {      
        return new Promise((resolve, reject) => {
            var data = JSON.stringify({
              "line_item": 
                  {
                      "quantity": reqdata.quantity,
                      "product_id": 0
                  }
              
          });
              
              var config = {
                method: 'put',
                url: 'https://api.bigcommerce.com/stores/'+process.env.STORE_Hash+'/v3/carts/'+reqdata.id+'/items/'+reqdata.item,
                headers: { 
                  'Accept': 'application/json', 
                  'Content-Type': 'application/json', 
                  'X-Auth-Client': process.env.ClientId, 
                  'X-Auth-Token': process.env.Token
                },
                data : data
              };

            //console.log(config)
            axios(config)
            .then(function (response) {
                if(response.status===201){
                    //let Id = response.data.id;
                    resolve(JSON.stringify(response.data));
                    //console.log(response.data)
                    //console.log(JSON.stringify(response.data))
                }
                else{
                    resolve(JSON.stringify(response.data));
                    //console.log(response)
                }
            })
            .catch(function (error) {
              reject(error);
            });
        })
          
    }

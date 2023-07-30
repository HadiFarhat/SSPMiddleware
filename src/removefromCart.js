import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

export default function(reqdata) {      
        return new Promise((resolve, reject) => {
           
              var config = {
                method: 'delete',
                url: 'https://api.bigcommerce.com/stores/'+process.env.STORE_Hash+'/v3/carts/'+reqdata.id+'/items/'+reqdata.itemId,
                headers: { 
                  'Accept': 'application/json', 
                  'Content-Type': 'application/json', 
                  'X-Auth-Client': process.env.ClientId, 
                  'X-Auth-Token': process.env.Token
                }
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


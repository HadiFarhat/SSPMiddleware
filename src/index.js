import express from 'express';
import createCart from './createCart.js';
import addtoCart from './addtoCart.js';
import removefromCart from './removefromCart.js';
import updateCart from './updateCart.js';
import getCart from './getCart.js';
import getCheckout from './getCheckout.js';
import cors from 'cors';
const app = express();
const PORT = 8080;

import dotenv from 'dotenv';

dotenv.config();


app.use(cors());

app.use(express.json());

app.listen(
    PORT,
    ()=> console.log("We're live baby!")
)


app.post('/createcart', (req, res) => {
    //console.log(req.body)
    const data = req.body;
    
    if(!data){
        res.status(418).send({message: 'Invalid Input.'})
    }

    else{
        console.log("creating process")
        createCart(data).then(
            resp =>{

                res.send({
                    status : 200,
                    message : resp
                })
            }
        )
        .catch (error => {
            res.send({
                status : 400,
                message: error
            })
        })

        
}
})

app.post('/addtocart', (req, res) => {
    //console.log(req.body)
    const data = req.body;
    
    if(!data){
        res.status(418).send({message: 'Invalid Input.'})
    }

    else{
        addtoCart(data).then(
            resp =>{

                res.send({
                    status : 200,
                    message : resp
                })
            }
        )
        .catch (error => {
            res.send({
                status : 400,
                message: error
            })
        })

        
}
})

app.put('/updatecart', (req, res) => {
    console.log(req.body)
    const data = req.body;
    
    if(!data){
        res.status(418).send({message: 'Invalid Input.'})
    }

    else{
        updateCart(data).then(
            resp =>{

                res.send({
                    status : 200,
                    message : resp
                })
            }
        )
        .catch (error => {
            res.send({
                status : 400,
                message: error
            })
        })

        
}
})

app.post('/removefromcart', (req, res) => {
    //console.log(req.body)
    const data = req.body;
    
    if(!data){
        res.status(418).send({message: 'Invalid Input.'})
    }

    else{
        removefromCart(data).then(
            resp =>{

                res.send({
                    status : 200,
                    message : resp
                })
            }
        )
        .catch (error => {
            res.send({
                status : 400,
                message: error
            })
        })

        
}
})

app.get('/getcart', (req, res) => {
    const data = req.query;
    
    if(!data){
        res.status(418).send({message: 'Invalid Input.'})
    }

    else{
        getCart(data).then(
            resp =>{

                res.send({
                    status : 200,
                    message : resp
                })
            }
        )
        .catch (error => {
            res.send({
                status : 400,
                message: error
            })
        })

        
}
})

app.get('/getstorefrontcart', (req, res) => {
    const data = req.query;

    if(!data){
        res.status(418).send({message: 'Invalid Input.'})
    }

    else{
        
        getCheckout(data).then(
            resp =>{

                res.send({
                    status : 200,
                    message : resp
                })
            }
        )
        .catch (error => {
            res.send({
                status : 400,
                message: error
            })
        })

        
}
})


export default app;

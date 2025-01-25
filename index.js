import express from "express";
import mongoose from "mongoose";
import { Product, Order } from "./models.js";


mongoose.connect("mongodb://localhost:27017/")

const app = express()

app.use(express.json())

app.get('/products', async (req, res) => {

    const products = await Product.find();

    res.json({products});

})


app.post('/products', async(req, res) => {

    const {productName, description} = req.body;

    const product = await Product.create({productName, description});

    res.json({product});
    

    

})


app.get('/orders', async (req, res) => {

    const orders = await Order.find();
    
    res.json({orders});
})










app.listen(5555)



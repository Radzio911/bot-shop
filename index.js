import express from "express";
import mongoose from "mongoose";
import { Product, Order } from "./models.js";
import { FaceBookConector } from "./faceBookConector.js";

mongoose.connect("mongodb://localhost:27017/bot_shop")

let currentVideoId = 'wwXIfr'

const app = express()

const faceBookConector = new FaceBookConector();

app.use(express.json())

app.set('view engine', 'ejs')
app.set('views', 'views')

setInterval(() => {
    faceBookConector.fetchcomments(currentVideoId)
}, 3000)

app.post('/videoId', (req, res) => {

    const { id } = req.body;

    currentVideoId = id;

    res.json({currentVideoId});
})


app.get('/products', async (req, res) => {

    const products = await Product.find();

    res.json({products});

})


app.post('/products', async(req, res) => {

    const {productName, description} = req.body;

    const product = await Product.create({productName, description});

    res.json({product});
    
})

app.post('/orders', async(req, res) => {

    const {user, message} = req.body;

    const order = await Order.create({user, message});

    res.json({order});
    
})



app.get('/orders', async (req, res) => {

    const orders = await Order.find();
    
    res.json({orders});
})

app.get('/', async (req, res) => {
    
    res.render('index', {products: await Product.find(), orders: await Order.find() })
})


app.get('/dodaj', (req, res) => {


    res.render('dodaj_produkt');
})




app.listen(5555)



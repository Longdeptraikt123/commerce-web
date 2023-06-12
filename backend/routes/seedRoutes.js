import express from 'express'
import Product from '../models/productModel.js'
import data from '../data.js'

const seedRouter = express.Router()
seedRouter.get('/', async (req, res) => {
    try {
        await Product.deleteMany({})
        const createdProduct = await Product.insertMany(data.products)
        res.send({ createdProduct })
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
});
export default seedRouter
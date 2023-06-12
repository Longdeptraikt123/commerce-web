import express from 'express'
import Product from '../models/productModel.js'
import data from '../data.js'
import User from '../models/userModel.js';

const seedRouter = express.Router()
seedRouter.get('/', async (req, res) => {
    try {
        await Product.deleteMany({})
        await User.deleteMany({})
        const createdProduct = await Product.insertMany(data.products)
        const createdUsers = await User.insertMany(data.users)
        res.send({ createdProduct, createdUsers })

    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Internal Server Error' });
    }


});
export default seedRouter
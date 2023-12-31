import express from 'express'
import expressAsyncHandler from 'express-async-handler'
import { isAuth } from '../utils.js'
import Order from '../models/orderModel.js'
const orderRouter = express.Router()
orderRouter.post(
    '/',
    isAuth,
    expressAsyncHandler(async (req, res) => {
        const newOrder = new Order({
            orderItems: req.body.orderItems.map((x) => ({ ...x, product: x._id })),
            shippingAddress: req.body.shippingAddress,
            paymentMethod: req.body.paymentMethod,
            itemsPrice: req.body.itemsPrice,
            shippingPrice: req.body.shippingPrice,
            taxPrice: req.body.taxPrice,
            totalPrice: req.body.totalPrice,
            user: req.user.id,
        });

        const order = await newOrder.save();
        res.status(201).send({ message: 'New Order Created', order });
    })
);

export default orderRouter
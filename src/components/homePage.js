import React, { useEffect, useReducer } from "react";
import axios from 'axios'
import logger from 'use-reducer-logger'
import Product from "./product";
const reducer = (state, action) => {
    switch (action.type) {
        case "FETCH_REQUEST":
            return {
                ...state,
                loading: true
            }

        case "FETCH_SUCCESS":
            return {
                ...state,
                loading: false,
                products: action.payload

            }

        case "FETCH_FAILED":
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        default:
            return state
    }
}

const Home = () => {
    const [{ loading, error, products }, dispatch] = useReducer(logger(reducer), {
        products: [],
        loading: true,
        error: ''
    })

    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'FETCH_REQUEST' })

            try {
                const result = await axios.get('/api/products')
                dispatch({ type: 'FETCH_SUCCESS', payload: result.data })

            }

            catch (error) {
                dispatch({ type: 'FETCH_FAILED', payload: error.message })
            }

        };
        fetchData();
    }, [])
    return (
        <div>
            <div className="w:100% m:1rem|0">
                <h1 className="text-align:center">Featured Product</h1>
            </div>
            <div className="flex gap:15 m:1rem|1rem|5px|1rem flex:wrap@<md jc:center align-items:center">
                {
                    loading ?
                        <p>Loading...</p>
                        : error ? (
                            <div>{error}</div>
                        ) :
                            products.map(product => {
                                return (
                                    <Product key={product.slug} product={product}></Product>
                                )
                            })}
            </div>
            <div className="text-align:center">
                <span className="f:18px font-weight:500">All right reserved</span>
            </div>
        </div>
    )
}
export default Home
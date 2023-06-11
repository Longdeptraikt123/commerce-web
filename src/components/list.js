import React, { useContext, useEffect, useReducer } from "react"
import { useNavigate, useParams } from "react-router-dom"
import axios from 'axios'
import Rating from "./rating";
import { Store } from "../store";

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
                product: action.payload

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
const List = () => {
    const navigate = useNavigate()
    const params = useParams()
    const { slug } = params

    const [{ loading, error, product }, dispatch] = useReducer(reducer, {
        product: [],
        loading: true,
        error: ''
    })

    useEffect(() => {

        const fetchData = async () => {
            dispatch({ type: 'FETCH_REQUEST' })

            try {
                const result = await axios.get(`/api/products/slug/${slug}`)
                dispatch({ type: 'FETCH_SUCCESS', payload: result.data })

            }

            catch (error) {
                dispatch({ type: 'FETCH_FAILED', payload: error.message })
            }

        };
        fetchData();

    }, [slug])
    console.log(product);
    const { state, dispatch: addToCartDispatch } = useContext(Store)
    const { cart } = state

    const addToCartHandler = async () => {
        const existProduct = cart.cartProducts.find((x) => x._id === product._id)
        const quantity = existProduct ? existProduct.quantity + 1 : 1
        const { data } = await axios.get(`/api/products/${product._id}`)

        if (data.countInStock < quantity) {
            window.alert("Product is out of stock")
            return;
        }

        addToCartDispatch({ type: 'CART_ADD_PRODUCT', payload: { ...product, quantity } })
        navigate('/cart')
    }
    const quantity = cart.cartProducts.find((x) => x._id === product._id)?.quantity || 0; // khai báo quantity bên ngoài để disable button + status

    return (
        <>
            {
                loading ?
                    <span>Loading...</span> :
                    error ?
                        <span>{error}</span>
                        :
                        (
                            <div key={product.slug} className="flex flex:column@<md flex:wrap@<md jc:center@<md align-items:center@<md">
                                <div className="ml:2rem">
                                    <img className="w:82% max-height:600px@<md  w:100%@<md" src={product.image} alt={product.name} />
                                </div>
                                <div className="flex jc:center flex:wrap@<md">
                                    <div className="flex flex:column m:2rem">
                                        <h2 className="f:55px">{product.name}</h2>
                                        <hr className="m:15px|0 border:0.5px|solid" />
                                        <Rating rating={product.rating} numReviews={product.numReviews} />
                                        <hr className="m:15px|0 border:0.5px|solid" />
                                        <span className="">Price: ${product.price}</span>
                                        <hr className="m:15px|0 border:0.5px|solid" />
                                        <span>Description: {product.description}</span>
                                    </div>
                                    <div className="flex w:50% flex:column mb:1rem@<md m:0|3rem|0|2rem p:15px border:1px|solid|#DEE1EC h:max-content">
                                        <span className="m:8px">Price: ${product.price}</span>
                                        <hr className="m:15px|0 border:0.5px|solid" />
                                        <div className="flex flex:column">
                                            <span className="m:8px">
                                                Status:{" "}
                                                {product.countInStock === quantity ? (
                                                    <span className="color:#fff p:5px bg:#FF6464 r:4px">Out of Stock</span>
                                                ) : (
                                                    <span className="color:#fff p:5px bg:#03C988 r:4px">Available</span>
                                                )}
                                            </span>
                                            <hr className="m:15px|0 border:0.5px|solid" />
                                            <button
                                                onClick={addToCartHandler}
                                                className="cursor:pointer border:1px|solid|#00337C color:#fff:hover bg:#0079FF:hover opacity:0.75:focus transition:all|0.2s|ease r:4px bg:#EBB02D m:10px p:7px">
                                                Add to Cart
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
        </>

    )
}
export default List
import { useContext } from "react";
import { Store } from "../store";
import { Link } from "react-router-dom";
import axios from "axios";
import Rating from "./rating";
const Product = ({ product }) => {
    const { state, dispatch: addToCartDispatch } = useContext(Store)
    const { cart: { cartProducts } } = state

    const addToCartHandler = async (item) => {
        const { data } = await axios.get(`/api/products/${item._id}`)
        const existProduct = cartProducts.find((x) => x._id === product._id)
        const quantity = existProduct ? existProduct.quantity + 1 : 1
        if (data.countInStock < quantity) {
            window.alert("Product is out of stock")
            return;
        }

        addToCartDispatch({ type: 'CART_ADD_PRODUCT', payload: { ...item, quantity } })

    }

    const quantity = cartProducts.find((x) => x._id === product._id)?.quantity || 0; // khai báo quantity bên ngoài để disable button + status

    return (
        <div className="border:1px|solid|#DBDFEA r:5px" key={product.slug}>
            <Link to={`/product/${product.slug}`}>
                <img className="w:100% max-width:400px" src={product.image} alt={product.name} />
            </Link>
            <div className="m:15px|20px">
                <Link className="text-decoration:underline" to={`/product/${product.slug}`}>
                    <h3 className="m:8px|0">{product.name}</h3>
                </Link>
                <Rating rating={product.rating} numReviews={product.numReviews} />
                <p><strong>${product.price}</strong></p>
                {product.countInStock === quantity ?
                    <button
                        disabled
                        onClick={() => addToCartHandler(product)}
                        className="m:12px|0 opacity:0.75 transition:all|0.2s|ease border:none p:10px color:#fff f:15px r:5px bg:red"
                    >
                        Out of Stock
                    </button>
                    :
                    <button
                        onClick={() => addToCartHandler(product)}
                        className="m:12px|0 opacity:0.75:hover transition:all|0.2s|ease border:none cursor:pointer p:10px color:#fff f:15px r:5px bg:#0079FF"
                    >
                        Add to Cart
                    </button>}

            </div>
        </div>

    )
}
export default Product
import { useContext } from "react"
import { AiFillPlusCircle, AiFillMinusCircle, AiFillDelete } from 'react-icons/ai';
import { Store } from "../store";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Cart = () => {
    const navigate = useNavigate()
    const { state, dispatch: addToCartDispatch } = useContext(Store)
    const { cart: { cartProducts } } = state
    const updateCartHandler = async (item, quantity) => {
        const { data } = await axios.get(`/api/products/${item._id}`)

        if (data.countInStock < quantity) {
            window.alert("Product is out of stock")
            return;
        }

        addToCartDispatch({ type: 'CART_ADD_PRODUCT', payload: { ...item, quantity } })

    }
    const deleteCartHandler = (item) => {
        addToCartDispatch({ type: 'CART_DELETE_PRODUCT', payload: item })
    }

    const checkoutHandler = () => {
        navigate('/signin?redirect=/shipping')
    }
    return (
        <>
            <div className="p:10">
                <h1 className="m:10px|2rem">Shopping Cart</h1>
            </div>

            <div className="flex jc:center m:1.5rem|0">
                {cartProducts.length === 0 ?
                    <span>Cart is Empty !</span>
                    :
                    <>
                        <div className="border:1px|solid|#DEE1EC">
                            {cartProducts.map((product) => {
                                return (
                                    <>
                                        <div key={product._id} className="flex gap:20 m:2rem|3rem|2rem|0 flex:wrap@<md">
                                            <img className="w:100px max-width:400px" src={product.image} alt="" />

                                            <div className="flex align-items:center">
                                                <span>{product.name}</span>
                                                <div className="flex jc:center align-items:center m:0|3rem">

                                                    <button onClick={() => updateCartHandler(product, product.quantity + 1)} disabled={product.quantity === product.countInStock} className="bg:transparent b:none"><AiFillPlusCircle className="cursor:pointer f:20px m:0|1rem" /></button>
                                                    <span>{product.quantity}</span>{' '}
                                                    <button onClick={() => updateCartHandler(product, product.quantity - 1)} disabled={product.quantity === 1} className="bg:transparent b:none"><AiFillMinusCircle className="cursor:pointer f:20px m:0|1rem" /></button>

                                                </div>
                                                <span className="m:0|2rem">${product.price}</span>
                                                <button onClick={() => deleteCartHandler(product)} className="bg:transparent b:none"><AiFillDelete className="f:18px cursor:pointer m:0|2rem" /></button>

                                            </div>
                                        </div>
                                        <hr className="w:10% m:15px|0 border:0.5px|solid|grey" />

                                    </>
                                )
                            })}
                        </div>

                        <div className="flex flex:column ml:1.5rem border:1px|solid|#DEE1EC h:max-content p:15px">
                            <h3 className="1rem|0">
                                Subtotal ({cartProducts.reduce((a, c) => a + c.quantity, 0)}{' '}items) : $
                                {cartProducts.reduce((a, c) => a + c.price * c.quantity, 0)}
                            </h3>
                            <hr className="m:15px|0 border:0.5px|solid|#DEE1EC" />
                            <button
                                onClick={checkoutHandler}
                                disabled={cartProducts.length === 0}
                                className="cursor:pointer border:1px|solid|#00337C color:#fff:hover bg:#0079FF:hover
                     opacity:0.75:focus transition:all|0.2s|ease r:4px bg:#EBB02D m:0.5rem|0 p:5px">
                                Proceed to checkout</button>
                        </div>
                    </>
                }


            </div>
        </>
    )
}
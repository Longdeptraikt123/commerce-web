import { useContext, useEffect, useReducer } from "react"
import { Store } from "../store"
import { Link, useNavigate } from "react-router-dom"
import Axios from "axios"

const reducer = (state, action) => {
    switch (action.type) {

        case 'CREATE_REQUEST':
            return {
                ...state,
                loading: true,
            }
        case 'CREATE_SUCCESS':
            return {
                ...state,
                loading: false,
            }
        case 'CREATE_FAIL':
            return {
                ...state,
                loading: false,
            }

        default:
            return state
    }
}


const Placeorder = () => {
    const navigate = useNavigate()
    const [{ loading }, dispatch] = useReducer(reducer, {
        loading: false,
    })
    const { state, dispatch: addToCartDispatch } = useContext(Store)
    const { cart, userInfo } = state
    const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100
    cart.itemsPrice = round2(
        cart.cartProducts.reduce((a, c) => a + c.quantity * c.price, 0)
    );

    cart.shippingPrice = cart.itemsPrice > 100 ? round2(0) : round2(10);
    cart.taxPrice = round2(0.15 * cart.itemsPrice)
    cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

    const placeOrderHandler = async () => {
        try {
            dispatch({ type: 'CREATE_REQUEST' })
            const { data } = await Axios.post(
                '/api/orders',
                {
                    orderItems: cart.cartProducts,
                    shippingAddress: cart.shippingAddress,
                    paymentMethod: cart.paymentMethod,
                    itemsPrice: cart.itemsPrice,
                    shippingPrice: cart.shippingPrice,
                    taxPrice: cart.taxPrice,
                    totalPrice: cart.totalPrice,
                },

                {
                    headers: {
                        authorization: `Bearer ${userInfo.token}`,
                    },
                }
            );
            addToCartDispatch({ type: 'CART_CLEAR' });
            dispatch({ type: 'CREATE_SUCCESS' });
            localStorage.removeItem('cartProducts');
            navigate(`/order/${data.order._id}`)
        }

        catch (error) {
            dispatch({ type: 'CREATE_FAIL' });
            alert(error)
        }
    }
    useEffect(() => {
        if (!cart.paymentMethod) {
            navigate('/payment')
        }
    }, [cart, navigate])
    return (
        <div>
            <h1 className="m:10px">Preview Order</h1>
            <div className="flex flex:wrap flex:column@<sm">
                <div className="flex:1 m:5px p:10px">
                    <div className="flex flex:column b:1px|solid|#D8D8D8 w:100% p:10px m:1rem|10px">
                        <h3 className="m:10px|0|15px|0">Shipping</h3>
                        <div>
                            <strong>Name: </strong>{cart.shippingAddress.fullName}<br />
                        </div>
                        <div>
                            <strong>Address:</strong> {cart.shippingAddress.address},{' '}
                            {cart.shippingAddress.city}, {cart.shippingAddress.postalCode},{' '}
                            {cart.shippingAddress.country}
                        </div>
                        <Link className="text-decoration:underline" to="/shipping">Edit</Link>
                    </div>
                    <div className="flex flex:column b:1px|solid|#D8D8D8 w:100% p:10px m:1rem|10px">
                        <h3 className="m:10px|0|15px|0">Payment</h3>
                        <div>
                            <strong>Method: </strong>{cart.paymentMethod}
                        </div>
                        <Link className="text-decoration:underline" to="/shipping">Edit</Link>
                    </div>

                    <div className="flex flex:column b:1px|solid|#D8D8D8 w:100% p:10px m:1rem|10px">
                        <h3 className="m:10px|0|15px|0">Items</h3>
                        {cart.cartProducts.map((item) => {
                            return (
                                <div key={item._id} className="flex align-items:center">
                                    <img className="b:1px|solid|#D8D8D8 p:10px|5px w:100px max-width:400px m:1.5rem|0" src={item.image} alt="#" />
                                    <div className="w:100% ml:15px flex jc:space-between">
                                        <span>{item.name}</span>
                                        <span>{item.quantity}</span>
                                        <span>${item.price}</span>
                                    </div>
                                </div>
                            )
                        })}
                        <Link className="text-decoration:underline" to="/shipping">Edit</Link>
                    </div>
                </div>

                <div className="flex flex:column align-items:center flex:1">
                    <h3>Order Summary</h3>
                    <div>
                        <div>
                            <span>Items: </span>
                            <span>{cart.itemsPrice.toFixed(2)}</span>
                        </div>
                        <div>
                            <span>Shipping Price: </span>
                            <span>{cart.shippingPrice.toFixed(2)}</span>
                        </div>
                        <div>
                            <span>Tax: </span>
                            <span>{cart.taxPrice.toFixed(2)}</span>
                        </div>
                        <div>
                            <span>Total: </span>
                            <span>${cart.totalPrice.toFixed(2)}</span>
                        </div>
                    </div>
                    <div>
                        <button
                            onClick={placeOrderHandler}
                            className="p:5px|10px cursor:pointer w:fit-content m:10px|0 border:1px|solid|#00337C color:#fff:hover bg:#0079FF:hover
                                     opacity:0.75:focus transition:all|0.2s|ease r:4px bg:#EBB02D"
                            type="button">
                            Place Order
                        </button>
                        {loading && <span>Loading...</span>}
                    </div>
                </div>

            </div>
        </div>

    )
}
export default Placeorder
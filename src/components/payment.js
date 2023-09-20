import { useState, useContext, useEffect } from "react";
import { Store } from "../store";
import { useNavigate } from "react-router-dom";
const Payment = () => {
    const navigate = useNavigate()
    const { state, dispatch: addToCartDispatch } = useContext(Store)

    const [paymentMethodName, setPaymentMethodName] = useState(
        paymentMethod || 'PayPal'
    );

    const {
        cart: { shippingAddress, paymentMethod }
    } = state

    useEffect(() => {
        if (!shippingAddress.address) {
            navigate('/shipping')
        }
    }, [shippingAddress, navigate])



    const handleSubmit = (e) => {
        e.preventDefault();
        addToCartDispatch({ type: "SAVE_PAYMENT_METHOD", payload: paymentMethodName });
        localStorage.setItem('paymentMethod', paymentMethodName)
        navigate('/placeorder')
    }
    return (
        <div className="flex flex:column align-items:center">
            <h1>Payment Method</h1>
            <form className="flex flex:column" onSubmit={handleSubmit}>
                <div>
                    <label className="f:22px font-weight:500" htmlFor='paypal'>Paypal</label>
                    <input
                        className="p:5px m:0|10px"
                        id="paypal"
                        label="paypal"
                        value="paypal"
                        checked={paymentMethodName === 'paypal'}
                        onChange={e => setPaymentMethodName(e.target.value)}
                        type="radio"
                    />
                </div>

                <div>
                    <label className="f:22px font-weight:500" htmlFor="stripe">Stripe</label>
                    <input
                        className="p:5px m:0|10px"
                        id="stripe"
                        label="stripe"
                        value="stripe"
                        checked={paymentMethodName === 'stripe'}
                        onChange={e => setPaymentMethodName(e.target.value)}
                        type="radio"
                    />
                </div>
                <button className="p:5px|10px cursor:pointer w:fit-content m:10px|0 border:1px|solid|#00337C color:#fff:hover bg:#0079FF:hover
                     opacity:0.75:focus transition:all|0.2s|ease r:4px bg:#EBB02D">
                    Continue
                </button>
            </form>
        </div>
    )
}
export default Payment
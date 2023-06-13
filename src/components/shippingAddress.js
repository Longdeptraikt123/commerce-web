import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Store } from '../store'
function ShippingAddress() {
    const { state, dispatch: addToCartDispatch } = useContext(Store)
    const { userInfo, cart: shippingAddress } = state
    const navigate = useNavigate()

    const [fullName, setFullName] = useState(shippingAddress.fullName || '')
    const [address, setAddress] = useState(shippingAddress.address || '')
    const [city, setCity] = useState(shippingAddress.city || '')
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || '')
    const [country, setCountry] = useState(shippingAddress.country || '')
    const submitHandler = (e) => {
        e.preventDefault()
        addToCartDispatch({
            type: 'SAVE_SHIPPING_CART',
            payload: {
                fullName,
                address,
                city,
                postalCode,
                country
            }
        });

        navigate('/payment')
    }
    useEffect(() => {
        if (!userInfo) {
            navigate('/login')
        }
    }, [userInfo,navigate])
    return (
        <div className='m:10px|0 flex flex:column align-items:center'>
            <h1>
                Shipping Address
            </h1>
            <form className='flex flex:column w:70%@<sm w:40%' onSubmit={submitHandler}>

                <label>Full Name</label>
                <input className='p:8px m:10px|0 b:1px|solid|#D8D8D8' value={fullName} required onChange={(e) => setFullName(e.target.value)} type='text' />

                <label>Address</label>
                <input className='p:8px m:10px|0 b:1px|solid|#D8D8D8' value={address} onChange={(e) => setAddress(e.target.value)} required type='text' />

                <label>City</label>
                <input className='p:8px m:10px|0 b:1px|solid|#D8D8D8' value={city} onChange={(e) => setCity(e.target.value)} required type='text' />

                <label>Postal Code</label>
                <input className='p:8px m:10px|0 b:1px|solid|#D8D8D8' value={postalCode} onChange={(e) => setPostalCode(e.target.value)} type='text' />

                <label>Country</label>
                <input className='p:8px m:10px|0 b:1px|solid|#D8D8D8' value={country} onChange={(e) => setCountry(e.target.value)} required type='text' />
                <div>
                    <button
                        className='p:12px|15px m:1rem|0 cursor:pointer border:1px|solid|#00337C color:#fff:hover bg:#0079FF:hover
                     opacity:0.75:focus transition:all|0.2s|ease r:4px bg:#EBB02D'
                        type='submit'>
                        Continue
                    </button>
                </div>
            </form>
        </div>
    )
}

export default ShippingAddress
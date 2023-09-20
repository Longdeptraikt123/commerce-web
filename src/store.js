import { createContext, useReducer } from "react";
export const Store = createContext()

const initState = {
    cart: {
        cartProducts: localStorage.getItem('cartProducts') ?
            JSON.parse(localStorage.getItem('cartProducts')) : [],

        shippingAddress: localStorage.getItem('shippingAddress')
            ? JSON.parse(localStorage.getItem('shippingAddress'))
            : {},

        paymentMethod: localStorage.getItem('paymentMethod')
            ? localStorage.getItem('paymentMethod')
            : '',
    },

    userInfo: localStorage.getItem('userInfo')
        ? JSON.parse(localStorage.getItem('userInfo'))
        : null,
}
const reducer = (state, action) => {
    switch (action.type) {
        case "CART_ADD_PRODUCT":
            const newProduct = action.payload
            const existProduct = state.cart.cartProducts.find(
                (product) => product._id === newProduct._id
            )

            const cartProducts = existProduct
                ?
                state.cart.cartProducts.map((product) => product._id === existProduct._id ? newProduct : product)
                :
                [...state.cart.cartProducts, newProduct]
            localStorage.setItem('cartProducts', JSON.stringify(cartProducts))
            return {
                ...state,
                cart: { ...state.cart, cartProducts }

            }

        case "CART_DELETE_PRODUCT":
            {
                const cartProducts = state.cart.cartProducts.filter(
                    (product) => product._id !== action.payload._id
                );
                localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
                return {
                    ...state,
                    cart: { ...state.cart, cartProducts }
                };
            }
        case "CART_CLEAR":
            return {
                ...state,
                cart: {
                    ...state.cart,
                    cartProducts: []
                }
            }
        case "USER_LOGIN":
            return {
                ...state,
                userInfo: action.payload
            }
        case "USER_LOGOUT":
            return {
                ...state,
                userInfo: null,
                cart: {
                    cartProducts: [],
                    shippingAddress: {},
                    paymentMethod: '',
                }
            }
        case "SAVE_SHIPPING_CART":
            return {
                ...state,
                cart: {
                    ...state.cart,
                    shippingAddress: action.payload
                }
            }
        case "SAVE_PAYMENT_METHOD":
            return {
                ...state,
                cart: {
                    ...state.cart,
                    paymentMethod: action.payload
                }
            }
        default:
            break;
    }
}

export const StoreProvider = (props) => {
    const [state, dispatch] = useReducer(reducer, initState)
    const value = { state, dispatch };
    return <Store.Provider value={value}>{props.children}</Store.Provider>
}
import { createContext, useReducer } from "react";
export const Store = createContext()

const initState = {
    cart: {
        cartProducts: localStorage.getItem('cartProducts') ?
            JSON.parse(localStorage.getItem('cartProducts')) : [],
    }
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
                )
                return {
                    ...state,
                    cart: { ...state.cart, cartProducts }

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
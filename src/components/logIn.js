import React, { useContext, useEffect, useState } from "react";
import Axios from 'axios'
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Store } from "../store";
const Login = () => {
    const { search } = useLocation()
    const navigate = useNavigate()
    const redirectInUrl = new URLSearchParams(search).get('redirect')
    const redirect = redirectInUrl ? redirectInUrl : '/'
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { state, dispatch: addToCartDispatch } = useContext(Store)
    const { userInfo } = state
    const submitHandler = async (e) => {
        e.preventDefault()
        try {
            const { data } = await Axios.post('api/users/login', {
                email,
                password
            });
            addToCartDispatch({ type: 'USER_LOGIN', payload: data })
            localStorage.setItem('userInfo', JSON.stringify(data))
            navigate(redirect || '/')
        }
        catch (error) {
            alert('Invalid email or password')
        }
    }
    useEffect(() => {
        if (userInfo) {
            navigate(redirect)
        }
    }, [navigate, redirect, userInfo])

    return (
        <div className="w:100% flex flex:column align-items:center m:1rem|0">
            <div className="m:1rem">
                <h1>Log in Form</h1>
            </div>
            <form onSubmit={submitHandler} className="flex p:1rem width:450px flex:column">
                
                <label className="m:4px|0">Email</label>
                <input onChange={(e) => setEmail(e.target.value)} className="m:8px|0 p:8px outline:none b:1px|solid|#DDE6ED r:5px" type="email" required />
                <label className="m:4px|0">Password</label>
                <input onChange={(e) => setPassword(e.target.value)} className="m:8px|0 p:8px outline:none b:1px|solid|#DDE6ED r:5px" type="password" required />
                <div>
                    <button
                        type="submit"
                        className="p:5px|10px cursor:pointer w:fit-content m:10px|0 border:1px|solid|#00337C color:#fff:hover bg:#0079FF:hover
                     opacity:0.75:focus transition:all|0.2s|ease r:4px bg:#EBB02D">
                        Log in</button>
                </div>
                <div>
                    New Customer? {' '}
                    <Link to={`/logup?redirect=${redirect}`} className="color:#4B56D2 text-decoration:underline ">Create your account</Link>
                </div>
            </form>
        </div>
    )
}
export default Login
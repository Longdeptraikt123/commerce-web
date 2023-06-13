import { Link, useNavigate, useLocation } from "react-router-dom"
import { useState, useContext } from "react"
import Axios from 'axios'
import { Store } from "../store"
const Logup = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { search } = useLocation()
    const [confirmPassword, setConfirmPassword] = useState('')
    const redirectInUrl = new URLSearchParams(search).get('redirect')
    const redirect = redirectInUrl ? redirectInUrl : '/'
    const { state, dispatch: addToCartDispatch } = useContext(Store)
    const navigate = useNavigate()
    const submitHandler = async (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            alert('Password do not match!')
        }
        try {
            const { data } = await Axios.post('api/users/logup', {
                name,
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
    return (
        <div className="w:100% flex flex:column align-items:center m:1rem|0">
            <div className="m:1rem">
                <h1>Log up Form</h1>
            </div>
            <form onSubmit={submitHandler} className="flex p:1rem width:450px flex:column">
                <label className="m:4px|0">Name</label>
                <input onChange={(e) => setName(e.target.value)} className="m:8px|0 p:8px outline:none b:1px|solid|#DDE6ED r:5px" type="text" required />
                <label className="m:4px|0">Email</label>
                <input onChange={(e) => setEmail(e.target.value)} className="m:8px|0 p:8px outline:none b:1px|solid|#DDE6ED r:5px" type="email" required />
                <label className="m:4px|0">Password</label>
                <input onChange={(e) => setPassword(e.target.value)} className="m:8px|0 p:8px outline:none b:1px|solid|#DDE6ED r:5px" type="password" required />
                <label className="m:4px|0">Confirm Password</label>
                <input onChange={(e) => setConfirmPassword(e.target.value)} className="m:8px|0 p:8px outline:none b:1px|solid|#DDE6ED r:5px" type="password" required />
                <div>
                    <button
                        type="submit"
                        className="p:5px|10px cursor:pointer w:fit-content m:10px|0 border:1px|solid|#00337C color:#fff:hover bg:#0079FF:hover
                     opacity:0.75:focus transition:all|0.2s|ease r:4px bg:#EBB02D">
                        Log up</button>
                </div>
                <div>
                    Already have an account? {' '}
                    <Link to={'/login'} className="color:#4B56D2 text-decoration:underline ">Log in</Link>
                </div>
            </form>
        </div>
    )
}
export default Logup

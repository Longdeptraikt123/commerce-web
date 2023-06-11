import React, { useContext } from 'react'
import { FaSearch } from 'react-icons/fa';
import { IoMdArrowDropdownCircle } from 'react-icons/io';
import { GiHamburgerMenu } from 'react-icons/gi';
import { Link } from "react-router-dom";
import { Store } from '../store';


const Navbar = () => {
    const { state: { cart } } = useContext(Store);
    return (
        <div className='bg:#111 p:1.5rem flex jc:space-between align-items:center'>
            <div className='rel flex align-items:center'>
                <GiHamburgerMenu className='f:35px color:#fff m:0|12px cursor:pointer transition:0.2s|ease opacity:0.7:hover' />
                <Link className='color:#fff opacity:0.5:hover' to='/'>Amazona</Link>
                <input type='text' placeholder='Search...' className='p:5px w:100% m:0|10px' />
                <FaSearch className='abs p:0|2px top:4 right:15 bg:#fff h:80%' />
            </div>
            <div className='flex'>
                <Link className='color:#fff p:0|5px opacity:0.5:hover transition:0.2s|ease f:14px@<xs' to='/cart'>
                    Cart
                    {cart.cartProducts.length > 0 && (
                        <span className='bg:red'>
                            {cart.cartProducts.reduce((a, c) => a + c.quantity, 0)}
                        </span>
                    )}
                </Link>

                <div className='rel transition:0.2s|ease opacity:0.5:hover'>
                    <Link className='m:0|8px color:#fff p:0|5px f:14px@<xs' to='/login'>Log in</Link>
                    <IoMdArrowDropdownCircle className=' abs top:0 right:1 color:#fff f:13px' />
                </div>

                <div className='rel transition:0.2s|ease f:14px@<xs opacity:0.5:hover'>
                    <Link className='m:0|8px color:#fff p:0|10px' to='#a'>Admin</Link>
                    <IoMdArrowDropdownCircle className=' abs top:0 right:5 color:#fff f:13px' />
                </div>
            </div>
        </div>
    )
}
export default Navbar
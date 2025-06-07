import React from 'react'
import { useUser } from '../context/UserContext'

function Header() {

    const {currentUser} = useUser();

    return (
        <div className='w-full h-24 bg-header p- flex items-center justify-between px-14'>
            <div className=' w-[438px] bg-white h-14 rounded-2xl ms-52'>
                <form className='h-full w-full'>
                    <input type="text" className='border-none outline-none h-full ms-2 rounded-2xl' />
                    <button className='bg-button h-full w-32 rounded-2xl float-end text-white'>Search</button>
                </form>
            </div>
            <div className='flex gap-3'>
                <div className='flex items-center gap-1'>
                    <i className="fa-solid fa-heart cursor-pointer" style={{ color: 'red' }}></i>
                    <div className='bg-button w-5 h-5 rounded-full flex items-center justify-center'>0</div>
                </div>
                <div className='flex items-center gap-1 text-white'>
                    {currentUser?.username}
                </div>
                <div className='flex items-center gap-1'>
                    <i className="fa-solid fa-cart-shopping cursor-pointer" style={{ color: 'green' }}></i>
                    <div className='bg-button w-5 h-5 rounded-full flex items-center justify-center'>0</div>
                </div>
            </div>
        </div>
    )
}

export default Header
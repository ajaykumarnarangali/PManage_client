import { useState } from 'react'
import { Link } from 'react-router-dom'
import useRegister from '../hooks/useRegister'

function Register() {

    const { handleChange,
        handleSubmit,
        loading,
        error, formData } = useRegister();

    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <div className='h-screen w-full flex max-h-screen'>
            <div
                className="w-[40%] h-full bg-cover bg-center md:flex justify-center items-center hidden"
                style={{ backgroundImage: "url('/auth_image.png')" }}
            >
                <div className='max-w-md w-100 text-center'>
                    <h1 className='text-[56px] font-bold text-white'>Welcome Back!</h1>
                    <p className='text-white'>To keep connected with us please <br /> login with your personal info</p>
                    <div className='w-full h-14 flex px-2 justify-center text-white'>
                        <Link to={'/'}>
                            <button className='h-16 w-80 bg-header border-2 border-white rounded-full mt-5 cursor-pointer'>
                                SIGN IN
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
            <div className='p-2 md:p-0 md:w-[60%] bg-white h-full flex justify-center items-center'>
                <div className='max-w-lg w-full text-center'>
                    <h1 className='text-button text-[56px] font-bold'>Create Account</h1>
                    <form className='flex flex-col gap-3 mt-10' onSubmit={handleSubmit}>
                        <div className='bg-inputBox w-full h-14 flex gap-2 px-4 items-center'>
                            <i className="fa-solid fa-user"></i>
                            <input type='text' placeholder='Name' name='username' className='h-full border-none outline-none bg-inherit'
                                value={formData.username} onChange={handleChange} />
                        </div>
                        <div className='bg-inputBox w-full h-14 flex gap-2 px-4 items-center'>
                            <i className="fa-solid fa-envelope"></i>
                            <input type='email' placeholder='Email' name='email' className='h-full border-none outline-none bg-inherit'
                                value={formData.email} onChange={handleChange} />
                        </div>
                        <div className='bg-inputBox w-full h-14 flex gap-2 px-4 items-center'>
                            <i className="fa-solid fa-lock"></i>
                            <input type='password' placeholder='Password' name='password' className='h-full border-none outline-none bg-inherit'
                                value={formData.password} onChange={handleChange} />
                        </div>
                        {error && <p className="text-red-500 text-sm my-1">{error}</p>}
                        <div className='w-full h-14 flex px-2 justify-center text-white'>
                            <button className='h-16 w-80 bg-button rounded-full mt-5' type='submit'>
                                SIGN UP
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register
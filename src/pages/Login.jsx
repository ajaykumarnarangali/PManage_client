import { Link } from 'react-router-dom'
import useLogin from '../hooks/useLogin'

function Login() {

    const { handleChange,
        handleSubmit,
        loading,
        error, formData } = useLogin();

    if (loading) {
        return <div>loading...</div>
    }

    return (
        <div className='h-screen w-full flex max-h-screen'>
            <div className='p-2 md:p-0 md:w-[60%] bg-white h-full flex justify-center items-center'>
                <div className='max-w-lg w-full text-center'>
                    <h1 className="text-button text-[56px] font-bold leading-[64px]">
                        Sign In to Your Account
                    </h1>
                    <form className='flex flex-col gap-3 mt-10' onSubmit={handleSubmit}>
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
                        <p className='text-center underline font-bold mt-3'>forgot password?</p>
                        <div className='w-full h-14 flex px-2 justify-center text-white'>
                            <button className='h-16 w-80 bg-button rounded-full mt-5'>
                                SIGN IN
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <div
                className="w-[40%] h-full bg-cover bg-center md:flex justify-center items-center hidden"
                style={{ backgroundImage: "url('/auth_image.png')" }}
            >
                <div className='max-w-md w-100 text-center'>
                    <h1 className='text-[56px] font-bold text-white'>Hello Friend!</h1>
                    <p className='text-white'>Enter your personal details and <br /> start your journey with us</p>
                    <div className='w-full h-14 flex px-2 justify-center text-white'>
                        <Link to={'/sign-up'}>
                            <button className='h-16 w-80 bg-header border-2 border-white rounded-full mt-5 cursor-pointer'>
                                SIGN UP
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
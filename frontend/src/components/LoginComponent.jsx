import React from 'react'
// import axios from 'axios'
import { Link } from 'react-router-dom'
import Logo from '../img/logo antares IR.png'

const LoginComponent = () => {
    return (
        <div className="container mx-auto font-plusjakarta max-w-screen-1920">
            <div className="flex">
                <div className="flex-1">
                    <div className="min-h-screen max-w-screen-2xl bg-gradient-to-tr from-yellow-500 via-red-600 to-black">
                        <div className="container py-96">
                            <img src={Logo} alt="Logo Antares" className='mx-auto py-10'/>
                        </div>
                    </div>
                </div>
                <div className="flex-1 my-auto">
                    <form className='mx-36'>
                    <div className="mb-7">
                            <label htmlFor="Login Akun" className='text-3xl font-bold'>Login Akun</label>
                        </div>
                        <div className="mb-8 field">
                            <label htmlFor="username" className='block mb-2 text-lg font-medium text-black'>Username <span className='text-orange-600'>*</span></label>
                            <input type="text" name='username' id='username' placeholder='Masukkan username' className='w-full px-3 py-2 border border-gray-300 focus:border-orange-600 rounded-md focus:outline-none focus:border-2 focus:ring-orange-600' required/>
                        </div>
                        <div className="mb-8 field">
                            <label htmlFor="password" className='block mb-2 text-lg font-medium text-black'>Password <span className='text-orange-600'>*</span></label>
                            <input type="password" name='password' id='password' placeholder='Masukkan password' className='w-full px-3 py-2 border border-gray-300 focus:border-orange-600 rounded-md focus:outline-none focus:border-2 focus:ring-orange-600' required/>
                            {/* <p className='text-red-500 mt-3 text-sm'>{message}</p> */}
                        </div>
                        <div className='mb-8 field'>
                            <button type='submit' className='text-white bg-orange-500 rounded-md text-lg font-medium w-full py-2 text-center hover:bg-orange-700'>Login Sekarang</button>
                        </div>
                        <div className="mb-8 field">
                            <label htmlFor="Buat Akun" className='text-sm flex items-start'>Belum punya akun?
                            <Link to="/Register" className='text-orange-500 ml-2 hover:font-semibold'>Buat akun disini sekarang</Link></label>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LoginComponent
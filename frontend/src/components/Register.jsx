import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import Logo from '../img/logo antares IR.png'
import AlertMessage from './alert/AlertMessage'

const Register = () => {
    const [fullName, setFullName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confPassword, setConfPassword] = useState("");
    const navigate = useNavigate();

    // Alert Message
    const [isAlertMessageOpen, setIsAlertMessageOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [isError, setIsError] = useState(false);

    const closeModal = () => setIsAlertMessageOpen(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/users', {
                full_name: fullName,
                username: username,
                password: password,
                conf_password: confPassword,
            });

            if (response.status === 201) {
                setMessage('Sukses ditambahkan');
                setIsError(false);
            }

            setIsAlertMessageOpen(true);
            setTimeout(() => {
                setIsAlertMessageOpen(false);
                navigate('/');
            }, 2000);
        } catch (error) {
            if (error.response) {
                if (error.response.status === 400) {
                    if (error.response.data.message === 'Password does not match') {
                        setMessage('Password tidak cocok');
                    } else if (error.response.data.message === 'Username already exists') {
                        setMessage('Username sudah ada');
                    } else {
                        setMessage('Akun sudah ada');
                    }
                } else {
                    setMessage('Gagal ditambahkan: ' + error.response.data.message);
                }
            } else if (error.request) {
                setMessage('Tidak ada respon dari server');
            } else {
                setMessage('Terjadi kesalahan: ' + error.message);
            }
            setIsError(true);
            setIsAlertMessageOpen(true);
            console.error('Error submitting form:', error);
        }
    }

    return (
        <>
        <div className="container mx-auto font-plusjakarta max-w-screen-1920">
            <div className="flex">
                <div className="flex-1 my-auto">
                    <form onSubmit={handleSubmit} className='mx-36'>
                    <div className="mb-7">
                            <label htmlFor="Login Akun" className='text-3xl font-bold'>Register Akun</label>
                        </div>
                        <div className="mb-8 field">
                            <label htmlFor="fullName" className='block mb-2 text-lg font-medium text-black'>Nama Lengkap <span className='text-orange-600'>*</span></label>
                            <input type="text" name='fullName' id='fullName' 
                            value={fullName} onChange ={(e) => setFullName(e.target.value)}placeholder='Masukkan nama lengkap' className='w-full px-3 py-2 border border-gray-300 focus:border-orange-600 rounded-md focus:outline-none focus:border-2 focus:ring-orange-600' required/>
                        </div>
                        <div className="mb-8 field">
                            <label htmlFor="username" className='block mb-2 text-lg font-medium text-black'>Username <span className='text-orange-600'>*</span></label>
                            <input type="text" name='username' id='username' value={username} onChange ={(e) => setUsername(e.target.value)}placeholder='Masukkan username' className='w-full px-3 py-2 border border-gray-300 focus:border-orange-600 rounded-md focus:outline-none focus:border-2 focus:ring-orange-600' required/>
                        </div>
                        <div className="mb-8 field">
                            <label htmlFor="password" className='block mb-2 text-lg font-medium text-black'>Password <span className='text-orange-600'>*</span></label>
                            <input type="password" name='password' id='password' value={password} onChange ={(e) => setPassword(e.target.value)}placeholder='Masukkan password' className='w-full px-3 py-2 border border-gray-300 focus:border-orange-600 rounded-md focus:outline-none focus:border-2 focus:ring-orange-600' required/>
                        </div>
                        <div className="mb-8 field">
                            <label htmlFor="confPassword" className='block mb-2 text-lg font-medium text-black'>Konfirmasi Password <span className='text-orange-600'>*</span></label>
                            <input type="password" name='confPassword' id='confPassword' value={confPassword} onChange ={(e) => setConfPassword(e.target.value)}placeholder='Ulangi password' className='w-full px-3 py-2 border border-gray-300 focus:border-orange-600 rounded-md focus:outline-none focus:border-2 focus:ring-orange-600' required/>
                            {/* <p className='text-red-500 mt-3 text-sm'>{message}</p> */}
                        </div>
                        <div className='mb-8 field'>
                            <button type='submit' className='text-white bg-orange-500 rounded-md text-lg font-medium w-full py-2 text-center hover:bg-orange-700'>Buat Akun</button>
                        </div>
                        <div className="mb-8 field">
                            <label htmlFor="Buat Akun" className='text-sm flex items-start'>Sudah punya akun?
                            <Link to="/" className='text-orange-500 ml-2 hover:font-semibold'>Login disini sekarang</Link></label>
                        </div>
                    </form>
                </div>
                <div className="flex-1">
                    <div className="min-h-screen max-w-screen-2xl bg-gradient-to-tr from-yellow-500 via-red-600 to-black">
                        <div className="container py-96">
                            <img src={Logo} alt="Logo Antares" className='mx-auto py-10'/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <AlertMessage 
            isOpen={isAlertMessageOpen}
            onClose={closeModal}
            message={message}
            isError={isError}
        />
        </>
    )
}

export default Register
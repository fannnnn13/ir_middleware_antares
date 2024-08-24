import React, { useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import AlertMessage from './alert/AlertMessage'

const AccountComponent = () => {
    const { user } = useSelector((state) => state.auth);
    const [fullName, setFullName] = useState(user.full_name);
    const [username, setUsername] = useState(user.username);
    const [password, setPassword] = useState("");
    const [confPassword, setConfPassword] = useState("");

    // Alert message
    const [isAlertMessageOpen, setIsAlertMessageOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [isError, setIsError] = useState(false);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.patch(`http://localhost:5000/users/${user.uuid}`, {
                full_name: fullName,
                username: username,
                password: password,
                conf_password: confPassword,
            });

            if (response.status === 200) {
                setMessage('Sukses diupdate');
                setIsError(false);
            }
            setIsAlertMessageOpen(true);
            setTimeout(() => {
                setIsAlertMessageOpen(false);
            }, 2000);
        } catch (error) {
            if (error.response) {
                if (error.response.status === 400) {
                    if (error.response.data.message === 'Password does not match') {
                        setMessage('Password tidak cocok');
                    } else if (error.response.data.message === 'Username already exists') {
                        setMessage('Username sudah ada');
                    } else if (error.response.data.message === 'New password must be different from the old password') {
                        setMessage('Password baru harus berbeda dari password lama');
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
        <div className="container">
            <header className="flex items-center py-12 gap-7">
                <h1 className="flex-1 text-3xl font-bold">Account</h1>
            </header>
            <div className="flex">
                <div className="flex-1">
                <form onSubmit={handleSubmit}>
                    <div className="mb-8 field">
                        <label htmlFor="fullName" className='block mb-2 text-lg font-medium text-black'>Nama Lengkap <span className='text-orange-600'>*</span></label>
                        <input type="text" name='fullName' id='fullName' 
                        value={fullName} onChange ={(e) => setFullName(e.target.value)}placeholder='Masukkan nama lengkap' className='w-full px-3 py-2 border border-gray-300 focus:border-orange-600 rounded-md focus:outline-none focus:border-2 focus:ring-orange-600'/>
                    </div>
                    <div className="mb-8 field">
                        <label htmlFor="username" className='block mb-2 text-lg font-medium text-black'>Username <span className='text-orange-600'>*</span></label>
                        <input type="text" name='username' id='username' value={username} onChange ={(e) => setUsername(e.target.value)}placeholder='Masukkan username' className='w-full px-3 py-2 border border-gray-300 focus:border-orange-600 rounded-md focus:outline-none focus:border-2 focus:ring-orange-600'/>
                    </div>
                    <div className="mb-8 field">
                        <label htmlFor="password" className='block mb-2 text-lg font-medium text-black'>Password <span className='text-orange-600'>*</span></label>
                        <input type="password" name='password' id='password' value={password} onChange ={(e) => setPassword(e.target.value)}placeholder='Masukkan password' className='w-full px-3 py-2 border border-gray-300 focus:border-orange-600 rounded-md focus:outline-none focus:border-2 focus:ring-orange-600'/>
                    </div>
                    <div className="mb-8 field">
                        <label htmlFor="confPassword" className='block mb-2 text-lg font-medium text-black'>Konfirmasi Password <span className='text-orange-600'>*</span></label>
                        <input type="password" name='confPassword' id='confPassword' value={confPassword} onChange ={(e) => setConfPassword(e.target.value)}placeholder='Ulangi password' className='w-full px-3 py-2 border border-gray-300 focus:border-orange-600 rounded-md focus:outline-none focus:border-2 focus:ring-orange-600'/>
                    </div>
                    <div className='mb-8 field'>
                        <button type='submit' className='text-white bg-orange-500 rounded-md text-lg font-medium w-full py-2 text-center hover:bg-orange-700'>Simpan</button>
                    </div>
                    </form>
                </div>
            </div>
        </div>
        <AlertMessage 
            isOpen={isAlertMessageOpen} 
            onClose={() => setIsAlertMessageOpen(false)} 
            message={message} 
            isError={isError}
        />
        </>
    )
}

export default AccountComponent
import React, { useState } from 'react'
import axios from 'axios'
import Modal from '../Modal'
import AlertMessage from '../alert/AlertMessage'

const AddBrandModal = ({ isOpen, onClose }) => {
    const [brandName, setBrandName] = useState('');
    const [isAlertMessageOpen, setIsAlertMessageOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);
    const closeModal = () => setIsAlertMessageOpen(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/brands', {
                brand_name: brandName
            });

            if (response.status === 201) {
                setMessage('Sukses ditambahkan');
                setIsError(false);
            } else if (response.status === 409) {
                setMessage('Brand sudah ada');
                setIsError(true);
            }
            setIsAlertMessageOpen(true);
            setBrandName('');
            onClose();
            window.location.reload();
        } catch (error) {
            setMessage('Gagal ditambahkan');
            setIsError(true);
            setIsAlertMessageOpen(true);
            console.error('Error submitting form:', error);
        }
    };

    return (
        <>
        <Modal isOpen={isOpen} onClose={onClose}>
            <h2 className="text-2xl font-bold p-4">Tambah Brand</h2>
            <form onSubmit={handleSubmit} className="p-4">
                <div className="mb-4">
                    <label htmlFor="brand" className="block text-gray-700 text-sm font-bold mb-2">
                        Nama Brand<span className='text-orange-600'> *</span>
                    </label>
                    <input
                        type="text"
                        id="brand"
                        value={brandName}
                        onChange={(e) => setBrandName(e.target.value)}
                        placeholder='Masukkan nama brand'
                        className="form-input mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-2 focus:border-orange-500 text-sm"
                    />
                </div>
                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="w-full bg-orange-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                    >
                        Tambah Brand
                    </button>
                </div>
            </form>
        </Modal>
        <AlertMessage 
            isOpen={isAlertMessageOpen}
            onClose={closeModal}
            message={message}
            isError={isError}
        />
        </>
    )
}

export default AddBrandModal
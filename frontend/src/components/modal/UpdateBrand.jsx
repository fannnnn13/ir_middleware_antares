import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from '../Modal';
import AlertMessage from '../alert/AlertMessage';

const UpdateBrandModal = ({ isOpen, onClose, brandData }) => {
    const [brandName, setBrandName] = useState('');
    const [isAlertMessageOpen, setIsAlertMessageOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);

    const closeModal = () => setIsAlertMessageOpen(false);

    useEffect(() => {
        // Set pre-filled data when the modal opens
        if (brandData) {
            setBrandName(brandData.brand_name || '');
        }
    }, [brandData]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.patch(`http://localhost:5000/brands/${brandData.uuid}`, {
                brand_name: brandName,
            });

            if (response.status === 200) {
                setMessage('Sukses diupdate');
                setIsError(false);
            }

            setIsAlertMessageOpen(true);
            setBrandName('');
            onClose();
            window.location.reload();
        } catch (error) {
            if (error.response) {
                if (error.response.status === 400) {
                    setMessage('Brand sudah ada');
                } else {
                    setMessage('Gagal diupdate: ' + error.response.data.message);
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
    };

    return (
        <>
        <Modal isOpen={isOpen} onClose={onClose}>
            <h2 className="text-2xl font-bold p-4">Update Brand</h2>
            <form onSubmit={handleSubmit} className="p-4">
                <div className="mb-4">
                    <label htmlFor="brandName" className="block text-gray-700 text-sm font-bold mb-2">
                        Nama Brand<span className='text-orange-600'> *</span>
                    </label>
                    <input
                        type="text"
                        id="brandName"
                        value={brandName}
                        onChange={(e) => setBrandName(e.target.value)}
                        className="form-input mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-2 focus:border-orange-500 text-sm"
                        placeholder='Masukkan nama brand'
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-orange-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                >
                    Update Brand
                </button>
            </form>
        </Modal>
        <AlertMessage 
            isOpen={isAlertMessageOpen}
            onClose={closeModal}
            message={message}
            isError={isError}
        />
        </>
    );
};

export default UpdateBrandModal;

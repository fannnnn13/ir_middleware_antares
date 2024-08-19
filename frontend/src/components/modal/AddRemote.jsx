import React, { useState } from 'react';
import axios from 'axios'
import Modal from '../Modal'
import AlertMessage from '../alert/AlertMessage'

const AddRemoteModal = ({ isOpen, onClose }) => {
    const [deviceName, setDeviceName] = useState('');
    const [serialNumber, setSerialNumber] = useState('');

    const [isAlertMessageOpen, setIsAlertMessageOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);
    const closeModal = () => setIsAlertMessageOpen(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/remotes', {
                device_name: deviceName,
                serial_number: serialNumber
            });

            if (response.status === 201) {
                setMessage('Sukses ditambahkan');
                setIsError(false);
            }
            
            setIsAlertMessageOpen(true);
            setDeviceName('');
            onClose();
            window.location.reload();
        } catch (error) {
            if (error.response) {
                if (error.response.status === 409) {
                    if (error.response.data.message === 'Device name already exists') {
                        setMessage('Nama remote/device sudah ada');
                    } else if (error.response.data.message === 'Serial number already exists') {
                        setMessage('Serial number sudah ada');
                    } else {
                        setMessage('Remote sudah ada');
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
    };

    return (
        <>
        <Modal isOpen={isOpen} onClose={onClose}>
        <h2 className="text-2xl font-bold p-4">Tambah IR Remote</h2>
            <form onSubmit={handleSubmit} className="p-4">
                <div className="mb-4">
                    <label htmlFor="deviceName" className="block text-gray-700 text-sm font-bold mb-2">
                        Nama Device<span className='text-orange-600'> *</span>
                    </label>
                    <input
                        type="text"
                        id="deviceName"
                        value={deviceName}
                        onChange={(e) => setDeviceName(e.target.value)}
                        placeholder='Masukkan nama device'
                        className="form-input mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-2 focus:border-orange-500 text-sm"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="serialNumber" className="block text-gray-700 text-sm font-bold mb-2">
                        Serial Number<span className='text-orange-600'> *</span>
                    </label>
                    <input
                        type="text"
                        id="serialNumber"
                        value={serialNumber}
                        onChange={(e) => setSerialNumber(e.target.value)}
                        placeholder='Masukkan serial number'
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
            isOpen = {isAlertMessageOpen}
            onClose = {closeModal}
            message = {message}
            isError = {isError}
        />
        </>
    )
}

export default AddRemoteModal;
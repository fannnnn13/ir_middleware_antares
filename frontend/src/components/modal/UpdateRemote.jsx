import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Modal from '../Modal'
import AlertMessage from '../alert/AlertMessage'

const UpdateRemoteModal = ({ isOpen, onClose, remoteData }) => {
    const [deviceName, setDeviceName] = useState(remoteData.deviceName || '');
    const [serialNumber, setSerialNumber] = useState(remoteData.serial_number || '');
    const [isAlertMessageOpen, setIsAlertMessageOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);

    const closeModal = () => setIsAlertMessageOpen(false);

    useEffect(() => {
        if (remoteData) {
            setDeviceName(remoteData.deviceName || '');
            setSerialNumber(remoteData.serialNumber || '');
        }
    }, [remoteData]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.patch(`http://localhost:5000/remotes/${remoteData.uuid}`, {
                device_name: deviceName,
                serial_number: serialNumber
            });

            if(response.status === 200) {
                setMessage('Sukses diupdate');
                setIsError(false);
            }

            setIsAlertMessageOpen(true);
            onClose();
            window.location.reload();
        } catch (error) {
            if (error.response) {
                if (error.response.status === 400) {
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
        <h2 className="text-2xl font-bold p-4">Update Device/IR Remote</h2>
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
                        className="form-input mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-2 focus:border-orange-500 text-sm"
                        placeholder='Masukkan nama device/IR Remote'
                        required
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
                        className="form-input mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-2 focus:border-orange-500 text-sm"
                        placeholder='Masukkan serial number'
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-orange-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                >
                    Update Device/IR Remote
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
    )
}

export default UpdateRemoteModal
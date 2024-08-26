import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Modal from '../Modal'
import AlertMessage from '../alert/AlertMessage'

const AddIRListModal = ({ isOpen, onClose, selectedDeviceId, selectedBrandId, selectedVariantId }) => {
    const [devices, setDevices] = useState([]);
    const [brands, setBrands] = useState([]);
    const [variants, setVariants] = useState([]);
    const [deviceId, setDeviceId] = useState(selectedDeviceId || '');
    const [brandId, setBrandId] = useState(selectedBrandId || '');
    const [variantId, setVariantId] = useState(selectedVariantId || '');

    const [isAlertMessageOpen, setIsAlertMessageOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);

    const closeModal = () => setIsAlertMessageOpen(false);

    useEffect(() => {
        const fetchDevices = async () => {
            try {
                const response = await axios.get('http://localhost:5000/remotes');
                const sortedDevices = response.data.sort((a, b) => a.device_name.localeCompare(b.device_name));
                setDevices(sortedDevices);
            } catch (error) {
                console.error('Error fetching brands:', error);
            }
        };

        fetchDevices();
    }, []);

    useEffect(() => {
        const fetchBrands = async () => {
            try {
                const response = await axios.get('http://localhost:5000/brands');
                const sortedBrands = response.data.sort((a, b) => a.brand_name.localeCompare(b.brand_name));
                setBrands(sortedBrands);
            } catch (error) {
                console.error('Error fetching brands:', error);
            }
        };

        fetchBrands();
    }, []);

    useEffect(() => {
        const fetchVariants = async () => {
            if(!brandId) return;
            try {
                const response = await axios.get(`http://localhost:5000/variants?brand_id=${brandId}`);
                const sortedVariants = response.data.sort((a, b) => a.variant_name.localeCompare(b.variant_name));
                setVariants(sortedVariants);
            } catch (error) {
                console.error('Error fetching variants:', error);
            }
        };

        fetchVariants();
    }, [brandId]);

    const handleBrandChange = (e) => {
        setBrandId(e.target.value);
        setVariantId('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/irlist', {
                device_id: deviceId,
                brand_id: brandId,
                variant_id: variantId
            });

            if (response.status === 201) {
                setMessage('Sukses ditambahkan');
                setIsError(false);
            }

            setIsAlertMessageOpen(true);
            onClose();
            window.location.reload();
        } catch (error) {
            if (error.response) {
                if (error.response.status === 409) {
                    setMessage('IR sudah ada di List');
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

    useEffect(() => {
        setDeviceId(selectedDeviceId || '');
        setBrandId(selectedBrandId || '');
        setVariantId(selectedVariantId || '');
    }, [selectedDeviceId, selectedBrandId, selectedVariantId]);

    const sendRawIR = async (serialNumber, rawData1, rawData2) => {
        try {
            const response = await axios.post('http://vm.iote.my.id:7470/ir/send-command', {
                serial_number: serialNumber,
                pesan1: rawData1,
                pesan2: rawData2
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            console.log('Response:', response.data);
        } catch (error) {
            console.error('Error sending raw IR:', error);
        }
    }

    return (
        <>
        <Modal isOpen={isOpen} onClose={onClose}>
        <h2 className="text-2xl font-bold p-4">Tambah IR List</h2>
            <form onSubmit={handleSubmit} className="p-4">
                <div className="mb-4">
                    <label htmlFor="device" className="block text-gray-700 text-sm font-bold mb-2">
                        Nama Remote (Otomatis)<span className='text-orange-600'> *</span>
                    </label>
                    <select
                        id="device"
                        value={deviceId}
                        onChange={(e) => setDeviceId(e.target.value)}
                        className="form-select mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-2 focus:border-orange-500 text-sm"
                    >
                        <option value="" disabled className='mr-4'>Pilih Remote/Device</option>
                        {devices.map(device => (
                            <option key={device.id} value={device.id}>
                                {device.device_name} - {device.serial_number}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label htmlFor="brand" className="block text-gray-700 text-sm font-bold mb-2">
                        Nama Brand<span className='text-orange-600'> *</span>
                    </label>
                    <select
                        id="brand"
                        value={brandId}
                        onChange={handleBrandChange}
                        className="form-select mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-2 focus:border-orange-500 text-sm"
                    >
                        <option value="" disabled className='mr-4'>Pilih Brand</option>
                        {brands.map(brand => (
                        <option key={brand.id} value={brand.id}>
                            {brand.brand_name}
                        </option>
                        ))}
                    </select>
                </div>
                <div className="flex flex-row justify-between gap-5">
                    <div className="container mb-6 basis-full">
                        <label htmlFor="variant" className="block text-gray-700 text-sm font-bold mb-2">
                            Nama Varian<span className='text-orange-600'> *</span>
                        </label>
                        <select
                            id="variant"
                            value={variantId}
                            onChange={(e) => setVariantId(e.target.value)}
                            className="form-select mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-2 focus:border-orange-500 text-sm mb-2"
                        >
                            <option value="" disabled className='mr-4'>Pilih Varian</option>
                            {variants.map(variant => (
                            <option key={variant.id} value={variant.id}>
                                {variant.variant_name}
                            </option>
                            ))}
                        </select>
                        <p className='text-xs text-red-500 font-light italic'>Info : Jika perangkat tidak merespon ganti varian infrared untuk melakukan validasi.</p>
                    </div>
                    <div className="container basis-20">
                        <button className='bg-orange-600 p-2 rounded-full hover:bg-orange-800 mt-2' onClick={() =>sendRawIR(deviceId.serial_number, variantId.raw_data1, variantId.raw_data2)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-power text-white" viewBox="0 0 16 16">
                                <path d="M7.5 1v7h1V1z"/>
                                <path d="M3 8.812a5 5 0 0 1 2.578-4.375l-.485-.874A6 6 0 1 0 11 3.616l-.501.865A5 5 0 1 1 3 8.812"/>
                            </svg>
                        </button>
                    </div>
                </div>
                <button
                type="submit"
                className="w-full bg-orange-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                >
                Tambah Varian
                </button>
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

export default AddIRListModal
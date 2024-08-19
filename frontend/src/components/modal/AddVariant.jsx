import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from '../Modal';
import AlertMessage from '../alert/AlertMessage';

const AddVariantModal = ({ isOpen, onClose, selectedBrandId }) => {
    const [brands, setBrands] = useState([]);
    const [brandId, setBrandId] = useState(selectedBrandId || '');    
    const [variantName, setVariantName] = useState('');
    const [rawData1, setRawData1] = useState('');
    const [rawData2, setRawData2] = useState('');

    // Alert Message
    const [isAlertMessageOpen, setIsAlertMessageOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);

    const closeModal = () => setIsAlertMessageOpen(false);

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
        setBrandId(selectedBrandId || '');
    }, [selectedBrandId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/variants', {
                brand_id: selectedBrandId,
                variant_name: variantName,
                raw_data1: rawData1,
                raw_data2: rawData2,
            });

            if (response.status === 201) {
                setMessage('Sukses ditambahkan');
                setIsError(false);
            } else if (response.status === 409) {
                setMessage('Varian sudah ada');
                setIsError(true);
            }
            setIsAlertMessageOpen(true);
            setVariantName('');
            onClose(); // Close modal after submission
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
        <h2 className="text-2xl font-bold p-4">Tambah Varian</h2>
        <form onSubmit={handleSubmit} className="p-4">
            <div className="mb-4">
            <label htmlFor="brand" className="block text-gray-700 text-sm font-bold mb-2">
                Nama Brand<span className='text-orange-600'> *</span>
            </label>
            <select
                id="brand"
                value={brandId}
                onChange={(e) => setBrandId(e.target.value)}
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
            <div className="mb-4">
            <label htmlFor="variantName" className="block text-gray-700 text-sm font-bold mb-2">
                Nama Varian<span className='text-orange-600'> *</span>
            </label>
            <input
                type="text"
                id="variantName"
                value={variantName}
                onChange={(e) => setVariantName(e.target.value)}
                className="form-input mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-2 focus:border-orange-500 text-sm"
                placeholder='Masukkan nama varian infrared'
                required
            />
            </div>
            <div className="mb-4">
            <label htmlFor="rawData1" className="block text-gray-700 text-sm font-bold mb-2">
                Raw Data 1<span className='text-orange-600'> *</span>
            </label>
            <input
                type="text"
                id="rawData1"
                value={rawData1}
                onChange={(e) => setRawData1(e.target.value)}
                className="form-input mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-2 focus:border-orange-500 text-sm"
                placeholder='Masukkan raw data 1'
                required
            />
            </div>
            <div className="mb-4">
            <label htmlFor="rawData2" className="block text-gray-700 text-sm font-bold mb-2">
                Raw Data 2
            </label>
            <input
                type="text"
                id="rawData2"
                value={rawData2}
                onChange={(e) => setRawData2(e.target.value)}
                className="form-input mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-2 focus:border-orange-500 text-sm"
                placeholder='Masukkan raw data 2'
            />
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

export default AddVariantModal;

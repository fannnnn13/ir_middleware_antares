import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from '../Modal';

const UpdateVariantModal = ({ isOpen, onClose, variantData }) => {
    const [brands, setBrands] = useState([]);
    const [brandId, setBrandId] = useState(variantData.brand_id || '');
    const [variantName, setVariantName] = useState(variantData.variant_name || '');
    const [rawData1, setRawData1] = useState(variantData.raw_data1 || '');
    const [rawData2, setRawData2] = useState(variantData.raw_data2 || '');

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
        // Set pre-filled data when the modal opens
        if (variantData) {
            setBrandId(variantData.brand_id || '');
            setVariantName(variantData.variant_name || '');
            setRawData1(variantData.raw_data1 || '');
            setRawData2(variantData.raw_data2 || '');
        }
    }, [variantData]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.patch(`http://localhost:5000/variants/${variantData.uuid}`, {
                brand_id: brandId,
                variant_name: variantName,
                raw_data1: rawData1,
                raw_data2: rawData2,
            });
            alert('Variant updated successfully');
            onClose(); // Close modal after submission
        } catch (error) {
            console.error('Error updating variant:', error);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <h2 className="text-2xl font-bold p-4">Update Varian</h2>
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
                    Update Varian
                </button>
            </form>
        </Modal>
    );
};

export default UpdateVariantModal;

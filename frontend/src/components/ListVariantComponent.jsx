import axios from 'axios';
import React, { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import AddVariant from './modal/AddVariant';

const ListVariantComponent = () => {
    const { uuid } = useParams();
    const [variants, setVariants] = useState([]);
    const [search, setSearch] = useState('');

    const [brandName, setBrandName] = useState('');
    const [selectedBrandId, setSelectedBrandId] = useState('');

    // Modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const getBrandsById = useCallback(async () => {
        try {
            const response = await axios.get(`http://localhost:5000/brands/${uuid}`);
            const brandData = response.data;
            setBrandName(brandData.brand_name || "Unknown Brand");
            setSelectedBrandId(brandData.id);
        } catch (error) {
            console.error("Error fetching brands:", error);
            setBrandName("Unknown Brand");
        }
    }, [uuid]);

    // const getVariants = async () => {
    //     const response = await axios.get("http://localhost:5000/variants");
    //     const sortedData = response.data.sort((a, b) => a.variant_name.localeCompare(b.variant_name));
    //     setVariants(sortedData);
    // };

    const getVariantsById = useCallback(async () => {
        try {
            const response = await axios.get(`http://localhost:5000/variants/${uuid}`);
            setVariants(response.data);
        } catch (error) {
            console.error("Error fetching variants:", error);
            setVariants([]);
        }
    }, [uuid]);

    const deleteVariant = async (uuid) => {
        await axios.delete(`http://localhost:5000/variants/${uuid}`);
        getVariantsById();
    };

    useEffect(() => {
        getBrandsById();
        getVariantsById();
    }, [getBrandsById, getVariantsById]);

    return (
        <div className="container">
            <div className="container">
                    <header className='flex items-center py-12 gap-7 content-between'>
                        <button>
                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
                            </svg>
                        </button>
                        <h1 className='flex-1 text-3xl font-bold'>List Varian Infrared</h1>
                        <button type='button' onClick={openModal} className= 'text-white text-md bg-orange-500 rounded-md font-medium hover:bg-orange-700 p-3 w-48'>
                            Tambah Varian
                        </button>
                        <AddVariant isOpen={isModalOpen} onClose={closeModal} selectedBrandId={selectedBrandId} />
                    </header>
                    {/* Details Variant */}
                    <div className="container border border-black">
                        <div className="container h-28 border-b border-black grid grid-cols-12 place-content-center p-8 bg-gradient-to-tl from-yellow-500 via-red-600 to-black border-r">
                            <h3 className='text-xl font-semibold text-white col-span-5 place-content-center'>{brandName}</h3>
                            <form className="grid justify-end col-start-10 col-end-13 place-content-center">
                                    <label htmlFor="search" className='text-sm font medium text-black sr-only'>Search</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search text-gray-400" viewBox="0 0 16 16">
                                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                                            </svg>
                                        </div>
                                        <input
                                            type="search"
                                            id="default-search"
                                            className="block w-full px-4 py-3 ps-10 text-sm text-black border border-gray-300 rounded-md bg-white focus:outline-none focus:border-black focus:border-2"
                                            placeholder="Search"
                                            onChange={(e) => setSearch(e.target.value.toLowerCase())}
                                            required
                                        />
                                    </div>
                            </form>
                        </div>
                        <div className="container">
                            {variants.length > 0 ? (
                                <div className="container grid min-h-full content-between">
                                    {/* Data */}
                                    {variants.filter((variant) => {
                                        return search === '' || 
                                            variant.variant_name.toLowerCase().includes(search);
                                    }).map((variant) => (
                                        <table className='table-auto '>
                                            <tbody>
                                                <tr key={variant.uuid} className='flex content-between border-b border-black p-2'>
                                                    <td className='flex-1 text-lg font-medium place-content-center ml-6'>{variant.variant_name}</td>
                                                    <td className='flex gap-4 place-content-end mr-6'>
                                                        <Link to={`/variants/edit/${variant.uuid}`} className='text-white text-xs text-center bg-orange-500 w-28 py-3 rounded-md hover:bg-orange-700'>Edit</Link>
                                                        <button onClick={() => deleteVariant(variant.uuid)} className='text-white text-xs text-center bg-red-500 w-28 py-3 rounded-md hover:bg-red-800'>Hapus</button>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    ))}
                                </div>
                            ) : (
                                <div className='container grid grid-rows-1 text-center h-screen -mt-32 -mb-40'>
                                    <div className="grid content-center">
                                        <h3 className='text-3xl font-semibold'>Tidak ada list varian IR</h3>
                                        <p className='text-md font-medium'><span className='text-orange-400'>Tambahkan Varian IR</span> di Tombol Tambah Varian</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
            </div>
        </div>
    )
}

export default ListVariantComponent;
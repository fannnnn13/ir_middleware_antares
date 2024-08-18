import axios from 'axios';
import React, { useState, useEffect } from 'react'
// import axios from 'axios'
import { Link } from 'react-router-dom'

const QuickManagerComponent = () => {
    const [brands, setBrands] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        getBrands();
    }, []);
    

    // const getBrands = async () => {
    //     const response = await axios.get("http://localhost:5000/brands");
    //     setBrands(response.data);
    //     console.log(response.data);
    // };

    const getBrands = async () => {
        const response = await axios.get("http://localhost:5000/brands");
        const sortedData = response.data.sort((a, b) => a.brand_name.localeCompare(b.brand_name));
        setBrands(sortedData);
        console.log(sortedData);
    };

    const deleteBrand = async (uuid) => {
        await axios.delete(`http://localhost:5000/brands/${uuid}`);
        getBrands();
    };

    return (
        <div className="container">
            {brands.length > 0 ? (
                <div className="container">
                    <header className='flex items-center py-12 content-between'>
                        <h1 className='flex-1 text-3xl font-bold'>Quick Match Manager</h1>
                        <button type='button' className= 'text-white text-md bg-orange-500 rounded-md font-medium hover:bg-orange-700 p-3 w-48'>
                            <Link to="/add-brand" className='text-center'>
                                Tambah Brand
                            </Link>
                        </button>
                    </header>
                    {/* Details Device */}
                    <div className="container border border-black">
                        <div className="container h-28 border-b border-black grid grid-cols-12 place-content-center p-8 bg-gradient-to-tl from-yellow-500 via-red-600 to-black border-r">
                            <h3 className='text-xl font-semibold text-white col-span-5 place-content-center'>Select Brands</h3>
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
                                            className="block w-full px-4 py-2 ps-10 text-sm text-black border border-gray-300 rounded-md bg-white focus:outline-none focus:border-orange-500 focus:border-2"
                                            placeholder="Search"
                                            onChange={(e) => setSearch(e.target.value.toLowerCase())}
                                            required
                                        />
                                    </div>
                            </form>
                        </div>
                        <div className="container grid min-h-full content-between">
                            {/* Data */}
                            {brands.filter((brand) => {
                                return search === '' || 
                                    brand.brand_name.toLowerCase().includes(search);
                            }).map((brand) => (
                                <table className='table-auto '>
                                    <tbody>
                                        <tr key={brand.uuid} className='grid grid-cols-2 content-between border-b border-black p-2'>
                                            <td className='text-lg font-medium place-content-center ml-6'>{brand.brand_name}</td>
                                            <td className='grid grid-cols-3 gap-4 place-content-end mr-6'>
                                                <Link to={`/brands/edit/${brand.uuid}`} className='text-white text-xs text-center bg-orange-500 px-2 py-2 rounded-md hover:bg-orange-700'>Edit Brand</Link>
                                                <Link to={`/brands/variants/${brand.uuid}`} className='text-orange-500 text-xs text-center bg-white px-4 py-2 rounded-md border border-orange-500 hover:bg-orange-400 hover:text-white'>List Varian</Link>
                                                <button onClick={() => deleteBrand(brand.uuid)} className='text-white text-xs text-center bg-red-500 px-4 py-2 rounded-md hover:bg-red-800'>Hapus</button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            ))}
                        </div>
                    </div>
                </div>
            ) : (
                <div className="container h-screen content-center">
                    <header className='grid grid-cols-12 gap-8 items-center'>
                        <h1 className='text-3xl font-bold col-span-6 grid justify-items-end'>Quick Match Manager</h1>
                        <button type='button' className='grid justify-items-start text-white text-md bg-orange-500 rounded-md font-medium hover:bg-orange-700 p-3 col-start-7 col-end-10 place-content-center mx-5'>
                            <Link to="/add-brand" className=''>
                            Tambah Brand
                            </Link>
                        </button>
                    </header>
                </div>
            )}
        </div>
    )
}

export default QuickManagerComponent;
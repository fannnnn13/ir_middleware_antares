import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import LogoRemote from '../img/remote.png';
import Power from '../img/Push Button.png';
import Device from '../img/Device.png';
import { useParams } from 'react-router-dom';

const DetailsDeviceComponent = () => {
    const { uuid } = useParams();
    const [irlists, setIrlists] = useState([]);
    const [search, setSearch] = useState('');

    const [deviceName, setDeviceName] = useState('');
    const [serialNumber, setSerialNumber] = useState('');

    // Memoize the getRemotesById function
    const getRemotesById = useCallback(async () => {
        try {
            const response = await axios.get(`http://localhost:5000/remotes/${uuid}`);
            const remoteData = response.data; // Directly access the data object
            setDeviceName(remoteData.device_name || "Unknown Device");
            setSerialNumber(remoteData.serial_number || "Unknown Serial Number");
            
        } catch (error) {
            console.error("Error fetching remotes:", error);
            setDeviceName("Unknown Device");
            setSerialNumber("Unknown Serial Number");
        }
    }, [uuid]);

    // Memoize the getIrList function
    const getIrList = useCallback(async () => {
        try {
            const response = await axios.get(`http://localhost:5000/irlist/${uuid}`);
            setIrlists(response.data);
        } catch (error) {
            console.error("Error fetching IR list:", error);
            setIrlists([]);
        }
    }, [uuid]); // uuid as dependency

    useEffect(() => {
        getRemotesById();
        getIrList();
    }, [getRemotesById, getIrList]); // Adding the memoized functions as dependencies

    return (
        <div className="container">
            <header className="flex items-center py-12 gap-7">
                <button>
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
                    </svg>
                </button>
                <h1 className="flex-1 text-3xl font-bold">Details Device</h1>
            </header>
            {/* Details Device */}
            <div className="container border border-black">
                <div className="flex container h-28 border-b border-black place-content-center p-8">
                    <div className="flex container">
                        <img src={LogoRemote} alt="Logo Remote" className='w-11 mr-5'/>
                        <div className="container col-start-2 col-end-10">
                            <h3 className="text-lg font-semibold mb-1">{deviceName}</h3>
                            <p className="text-xs">SN : {serialNumber}</p>
                        </div>
                    </div>
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
                <div className="container">
                {/* Datas */}
                {irlists.length > 0 ? (
                    <div className="container grid grid-cols-3 gap-6 p-5 min-h-full">
                        {/* Data */}
                        {irlists.filter((irlist) => {
                            return search === '' || 
                                irlist.brand?.brand_name.toLowerCase().includes(search) || 
                                irlist.variant_ir?.variant_name.toLowerCase().includes(search);
                        }).map((irlist) => (
                            <div key={irlist.uuid} className="p-7 content-between grid grid-cols-4 border border-black rounded-md place-content-center hover:shadow-myBox hover:duration-500 h-24">
                                <img src={Device} alt="Logo Device" className='w-7'/>
                                <div className="container col-span-2 -ml-7">
                                    <h3 className='variant text-md -mt-1 mb-1 font-semibold'>{irlist.variant_ir?.variant_name}</h3>
                                    <p className='merk text-xs'>{irlist.brand?.brand_name}</p>
                                </div>
                                <button className='grid justify-items-end'>
                                    <img src={Power} alt="Button Power" className='w-9'/>
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className='container grid grid-rows-1 text-center h-screen -mt-32 -mb-36'>
                        <div className="grid content-center">
                            <h3 className='text-3xl font-semibold'>Tidak ada list varian IR</h3>
                            <p className='text-md font-medium'><span className='text-orange-400'>Tambahkan Varian IR</span> di Device Manager</p>
                        </div>
                    </div>
                )}
                </div>
            </div>
        </div>
    )
}

export default DetailsDeviceComponent;

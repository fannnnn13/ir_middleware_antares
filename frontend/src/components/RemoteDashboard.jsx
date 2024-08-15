import React, { useState, useEffect } from 'react'
import axios from 'axios'
import LogoRemote from '../img/remote.png'
import { Link } from 'react-router-dom'

const RemoteDashboard = () => {
    const [remotes, setRemotes] = useState([]);
    const [search, setSearch] = useState('');
    
    useEffect(() => {
        getRemotes();
    }, []);

    const getRemotes = async () => {
        const response = await axios.get("http://localhost:5000/remotes");
        setRemotes(response.data);
    }

    const truncateText = (text, maxLength = 12) => {
        if (text.length > maxLength) {
            return text.slice(0, maxLength) + '...';
        }
        return text;
    };

    return (
        <div className="container">
            <header className="grid grid-cols-2 items-center py-12">
                <h1 className="text-3xl font-bold">Dashboard</h1>
                <form className="grid justify-end">
                    <label htmlFor="search" className='text-sm font-medium text-black sr-only'>Search</label>
                    <div className="relative">
                    <div
                            className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                class="bi bi-search text-gray-400"
                                viewBox="0 0 16 16"
                            >
                                <path
                                    d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"
                                />
                            </svg>
                        </div>
                        <input
                            type="search"
                            id="default-search"
                            class="block w-full px-4 py-2 ps-10 text-sm text-black border border-gray-300 rounded-md bg-white focus:outline-none focus:border-orange-500 focus:border-2"
                            placeholder="Search"
                            onChange={(e) => setSearch(e.target.value.toLowerCase())}
                            required
                        />
                    </div>
                </form>
            </header>
            {remotes.length > 0 ? (
            <div className="grid grid-cols-4 gap-4">
                {remotes.filter((remote) => {
                    return search.toLowerCase() === '' || remote.serial_number.toLowerCase().includes(search) || remote.device_name.toLowerCase().includes(search);
                }).map((remote) => (
                    <Link to={`/details-device/${remote.uuid}`} key={remote.id} className='block'>
                        <div className=' p-6 content-between grid grid-cols-3 border border-black rounded-md hover:shadow-myBox hover:duration-500'>
                            <img src={LogoRemote} alt="Logo Remote" className="w-11"/>
                            <div className="container col-span-2">
                                <h3 className="text-lg font-semibold text-end mb-1">{truncateText(remote.device_name)}</h3>
                                <p className="text-xs text-end">{remote.serial_number}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
            ) : (
                <div className='container grid grid-rows-1 text-center h-full my-60'>
                    <div className="my-auto">
                        <h3 className='text-3xl font-semibold'>Tidak ada Device IR Remote</h3>
                        <p className='text-md font-medium'><span className='text-orange-400'>Registrasi Device IR Remote</span> di Device Manager</p>
                    </div>
                </div>
            )}
        </div>
    )
}

export default RemoteDashboard
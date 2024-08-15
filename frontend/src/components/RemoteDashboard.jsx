import React from 'react'
import LogoRemote from '../img/remote.png'

const RemoteDashboard = () => {
    return (
        <div className="container">
            <header className="grid grid-cols-2 items-center py-12">
                <h1 className="text-3xl font-bold">Dashboard</h1>
                <form className="grid justify-end">
                    <label htmlFor="search" className='text-sm font medium text-black sr-only'>Search</label>
                    <div className="relative">
                    <div
                            class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"
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
                            required
                        />
                    </div>
                </form>
            </header>
            <div className="grid grid-cols-4 gap-4">
                <div className=' p-5 content-between grid grid-cols-2 border border-black rounded-md'>
                    <img src={LogoRemote} alt="Logo Remote" className="w-11"/>
                    <div className="container">
                        <h3 className="text-lg">IR Remote 1</h3>
                        <p className="text-xs">Serial Number</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RemoteDashboard
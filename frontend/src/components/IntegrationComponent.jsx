import React, { useState, useEffect } from 'react'
import axios from 'axios'
import AddIntegration from './modal/AddIntegration';
import UpdateIntegration from './modal/UpdateIntegration';
import AlertMessage from './alert/AlertMessage'

const IntegrationComponent = () => {
    const [integrations, setIntegrations] = useState([]);
    const [search, setSearch] = useState('');
    const [integrationData, setIntegrationData] = useState({});
    const [selectedDeviceId, setSelectedDeviceId] = useState('');

    // Alert
    const [isAlertMessageOpen, setIsAlertMessageOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);

    const closeAlertMessage = () => setIsAlertMessageOpen(false);

    // Modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const openUpdateModal = (integration) => {
        setIntegrationData(integration);
        setIsUpdateModalOpen(true);
    }

    const closeUpdateModal = () => setIsUpdateModalOpen(false);

    const getIntegrations = async () => {
        const response = await axios.get("http://localhost:5000/integrations");
        const sortedData = response.data.sort((a, b) => a.integration_name.localeCompare(b.integration_name));
        setIntegrations(sortedData);
    }

    const deleteIntegration = async (uuid) => {
        try {
            await axios.delete(`http://localhost:5000/integrations/${uuid}`);
            setMessage('Sukses dihapus');
            setIsError(false);
            getIntegrations();
        } catch (error) {
            setMessage('Gagal dihapus');
            setIsError(true);
            console.error('Error deleting integration:', error);
        } finally {
            setIsAlertMessageOpen(true);
        }
    }

    const handleDeviceSelect = (deviceId) => {
        setSelectedDeviceId(deviceId);
        openModal();
    }

    useEffect(() => {
        getIntegrations();
    }, []);

    return (
        <>
        <div className="container">
            {integrations.length > 0 ? (
                <div className="container">
                    <header className="flex items-center py-12 justify-between">
                        <h1 className="flex-1 text-3xl font-bold">Integration Menu</h1>
                        <button type='button' onClick={() => handleDeviceSelect('')} className= 'text-white text-md bg-orange-500 rounded-md font-medium hover:bg-orange-700 p-3 w-48 mr-4'>
                            Tambah Integrasi
                        </button>
                        <AddIntegration isOpen={isModalOpen} onClose={closeModal} selectedDeviceId={selectedDeviceId} />
                        
                        {/* <AddRemote isOpen={isModalOpen} onClose={closeModal} /> */}
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
                                        className="bi bi-search text-gray-400"
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
                                    className="block w-full px-4 py-3 ps-10 text-sm text-black border border-gray-300 rounded-md bg-white focus:outline-none focus:border-orange-500 focus:border-2"
                                    placeholder="Search"
                                    onChange={(e) => setSearch(e.target.value.toLowerCase())}
                                    required
                                />
                            </div>
                        </form>
                    </header>
                    <div className="container min-h-full border border-black">
                        <table className='table-fixed w-full'>
                            <thead className='bg-orange-400 text-white'>
                                <tr className=''>
                                    <th className='w-1/6 font-semibold text-lg text-start px-7 py-8'>Nama Integrasi</th>
                                    <th className='w-1/6 font-semibold text-lg text-start px-7 py-8'>Access Key</th>
                                    <th className='w-1/6 font-semibold text-lg text-start px-7 py-8'>Application Name</th>
                                    <th className='w-1/6 font-semibold text-lg text-start px-7 py-8'>Device Name</th>
                                    <th className='w-1/6 font-semibold text-lg text-start px-7 py-8'>SN Device</th>
                                    <th className='w-1/6 font-semibold text-lg text-start px-7 py-8'>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {integrations.filter((integration) => {
                                    return search === '' ||
                                        integration.integration_name.toLowerCase().includes(search) ||
                                        integration.ir_remote?.serial_number.toLowerCase().includes(search);
                                }).map((integration) => (
                                    <tr key={integration.uuid} className='border-b border-black'>
                                        <td className='w-1/6 text-md font-medium text-start p-1 break-words px-7 py-5'>{integration.integration_name}</td>
                                        <td className='w-1/6 text-md font-medium text-start p-1 break-words px-7 py-5'>{integration.access_key}</td>
                                        <td className='w-1/6 text-md font-medium text-start p-1 break-words px-7 py-5'>{integration.antares_app_name}</td>
                                        <td className='w-1/6 text-md font-medium text-start p-1 break-words px-7 py-5'>{integration.antares_device_name}</td>
                                        <td className='w-1/6 text-md font-medium text-start p-1 break-words px-7 py-5'>{integration.ir_remote.serial_number}</td>
                                        <td className='w-1/6 text-md font-medium text-start p-1'>
                                            <button onClick={() => openUpdateModal(integration)} className='text-white text-md text-center bg-orange-500 px-4 py-2 rounded-md hover:bg-orange-700 mr-2'>Edit</button>
                                            <button onClick={() => deleteIntegration(integration.uuid)} className='text-white text-md text-center bg-red-500 px-4 py-2 rounded-md hover:bg-red-800'>Hapus</button>
                                            <UpdateIntegration isOpen={isUpdateModalOpen} onClose={closeUpdateModal} integrationData={integrationData} /> 
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <div className="container h-screen content-center">
                    <header className='grid grid-cols-12 gap-8 items-center'>
                        <h1 className='text-3xl font-bold col-span-6 grid justify-items-end'>Integration Menu</h1>
                        <button type='button' onClick={openModal} className= 'grid justify-items-start text-white text-md bg-orange-500 rounded-md font-medium hover:bg-orange-700 p-3 col-start-7 col-end-10 place-content-center mx-5'>
                            Tambah Integrasi
                        </button>
                        <AddIntegration isOpen={isModalOpen} onClose={closeModal} selectedDeviceId={selectedDeviceId} />
                    </header>
                </div>
            )}
        </div>
        <AlertMessage 
            isOpen={isAlertMessageOpen}
            onClose={closeAlertMessage}
            message={message}
            isError={isError}
        />
        </>
    )
};

export default IntegrationComponent
import React, { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import AlertMessage from './alert/AlertMessage'
import LogoRemote from '../img/remote.png'
import { useParams, useNavigate } from 'react-router-dom'
import AddIRList from './modal/AddIRList'
import UpdateRemote from './modal/UpdateRemote'

const DetailsDeviceManagerComponent = () => {
    const navigate = useNavigate();
    const { uuid } = useParams();
    const [irlists, setIrlists] = useState([]);
    const [search, setSearch] = useState('');
    const [remoteData, setRemoteData] = useState({});

    const [navigateAfterClose, setNavigateAfterClose] = useState(false);

    const [deviceName, setDeviceName] = useState('');
    const [serialNumber, setSerialNumber] = useState('');
    const [selectedBrandId, setSelectedBrandId] = useState('');
    const [selectedVariantId, setSelectedVariantId] = useState('');
    const [selectedDeviceId, setSelectedDeviceId] = useState('');

    const [isAlertMessageOpen, setIsAlertMessageOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);
    // const closeAlertMessage = () => setIsAlertMessageOpen(false);

    // Modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const openUpdateModal = () => {
        setRemoteData({uuid, deviceName, serialNumber});
        setIsUpdateModalOpen(true);
    };

    const closeUpdateModal = () => setIsUpdateModalOpen(false);

    const closeAlertMessage = () => {
        setIsAlertMessageOpen(false);
        if (navigateAfterClose) {
            setTimeout(() => {
                navigate('/device-manager');
            }, 500);
        }
    }

    const getRemotesById = useCallback(async () => {
        try {
            const response = await axios.get(`http://localhost:5000/remotes/${uuid}`);
            const remoteData = response.data;
            setDeviceName(remoteData.device_name || "Unknown Device");
            setSerialNumber(remoteData.serial_number || "Unknown Serial Number");
            setSelectedDeviceId(remoteData.id);
        } catch (error) {
            console.error("Error fetching remotes:", error);
            setDeviceName("Unknown Device");
            setSerialNumber("Unknown Serial Number");
        }
    }, [uuid]);

    const getBrandsById = useCallback(async () => {
        try {
            const response = await axios.get(`http://localhost:5000/brands/${uuid}`);
            const brandData = response.data;
            setSelectedBrandId(brandData.id);
        } catch (error) {
            console.error("Error fetching brands:", error);
        }
    }, [uuid]);

    const getVariantsById = useCallback(async () => {
        try {
            const response = await axios.get(`http://localhost:5000/variants/${uuid}`);
            const variantData = response.data;
            setSelectedVariantId(variantData.id);
        } catch (error) {
            console.error("Error fetching variants:", error);
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

    const deleteRemote = async () => {
        try {
            await axios.delete(`http://localhost:5000/remotes/${uuid}`);
            setMessage('Sukses dihapus');
            setIsError(false);
            setNavigateAfterClose(true);
        } catch (error) {
            setMessage('Gagal dihapus');
            setIsError(true);
            console.error('Error deleting remote:', error);
        } finally {
            setIsAlertMessageOpen(true);
        }
    };

    const deleteIrList = async (irlistuuid) => {
        console.log(irlistuuid);

        try {
            await axios.delete(`http://localhost:5000/irlist/${irlistuuid}`);
            setMessage('Sukses dihapus');
            setIsError(false);
            getIrList();
        } catch (error) {
            setMessage('Gagal dihapus');
            setIsError(true);
            console.error('Error deleting IR list:', error);
        } finally {
            setIsAlertMessageOpen(true);
        }
    };

    useEffect(() => {
        getRemotesById();
        getBrandsById();
        getVariantsById();
        getIrList();
    }, [getRemotesById, getBrandsById, getVariantsById, getIrList]); // Adding the memoized functions as dependencies

    return (
        <>
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
                        {/* Search */}
                        <form className="place-content-center mr-4">
                                <label htmlFor="search" className='text-sm font medium text-black sr-only'>Search</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-search text-gray-400" viewBox="0 0 16 16">
                                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                                        </svg>
                                    </div>
                                    <input
                                        type="search"
                                        id="default-search"
                                        className="block w-36 py-3 ps-10 text-sm text-black border border-gray-300 rounded-md bg-white focus:outline-none focus:border-orange-500 focus:border-2"
                                        placeholder="Search"
                                        onChange={(e) => setSearch(e.target.value.toLowerCase())}
                                        required
                                    />
                                </div>
                        </form>
                        <button onClick={openModal} className='text-orange-500 text-sm text-center bg-white w-96 py-3 rounded-md border border-orange-500 hover:bg-orange-400 hover:text-white mr-4'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-plus-circle-fill inline -mt-1 mr-3" viewBox="0 0 16 16">
                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z"/>
                            </svg>Tambah List IR
                        </button>
                        <button onClick={openUpdateModal} className='text-white text-sm text-center bg-orange-500 w-80 py-3 rounded-md hover:bg-orange-700 mr-4'>Edit</button>
                        <button onClick={deleteRemote} className='text-white text-sm text-center bg-red-500 w-80 py-3 rounded-md hover:bg-red-800'>Hapus</button>
                        <AddIRList isOpen={isModalOpen} onClose={closeModal} selectedDeviceId={selectedDeviceId} selectedBrandId={selectedBrandId} selectedVariantId={selectedVariantId}/>
                        <UpdateRemote isOpen={isUpdateModalOpen} onClose={closeUpdateModal} remoteData={remoteData} />
                    </div>
                </div>
                <div className="container">
                {/* Datas */}
                {irlists.length > 0 ? (
                    <div className="container min-h-full">
                        <table className='table-auto w-full'>
                            <thead className='bg-orange-400 text-white'>
                                <tr className='flex content-between px-8 py-5'>
                                    <th className='basis-1/3 font-medium text-start'>Nama Brand</th>
                                    <th className='basis-1/3 font-medium text-start'>Nama Varian</th>
                                    <th className='basis-1/3 font-medium text-start'>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {irlists.filter((irlist) => {
                                    return search === '' || 
                                        irlist.brand?.brand_name.toLowerCase().includes(search) || 
                                        irlist.variant_ir?.variant_name.toLowerCase().includes(search);
                                }).map((irlist) => (
                                    <tr key={irlist.uuid} className='flex content-between border-b border-black px-8 py-2'>
                                        <td className='basis-1/3 text-lg font-medium text-start'>{irlist.brand.brand_name}</td>
                                        <td className='basis-1/3 text-lg font-medium text-start'>{irlist.variant_ir.variant_name}</td>
                                        <td className='basis-1/3 text-lg font-medium text-start'>
                                            <button onClick={() => deleteIrList(irlist.uuid)} className='text-white text-xs text-center bg-red-500 px-24 py-2 rounded-md hover:bg-red-800'>Hapus</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className='container grid grid-rows-1 text-center h-screen'>
                        <div className="grid content-center">
                            <h3 className='text-3xl font-semibold mb-2'>Tidak ada list varian IR</h3>
                            <p className='text-md font-medium'><span className='text-orange-400'>Tambahkan Varian IR</span> di Tombol Tambah List IR</p>
                        </div>
                    </div>
                )}
                </div>
            </div>
        </div>
        <AlertMessage 
            isOpen={isAlertMessageOpen}
            onClose={closeAlertMessage}
            message={message}
            isError={isError}
        />
        </>
    )
}

export default DetailsDeviceManagerComponent
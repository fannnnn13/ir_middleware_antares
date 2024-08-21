import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Modal from '../Modal'

const UpdateIntegrationModal = ({ isOpen, onClose, integrationData }) => {
    const [devices, setDevices] = useState([]);
    const [integrationName, setIntegrationName] = useState(integrationData.integration_name || '');
    const [accessKey, setAccessKey] = useState(integrationData.access_key || '');
    const [antaresAppName, setAntaresAppName] = useState(integrationData.antares_app_name || '');
    const [antaresDeviceName, setAntaresDeviceName] = useState(integrationData.antares_device_name || '');
    const [deviceId, setDeviceId] = useState(integrationData.device_id || '');

    useEffect(() => {
        const fetchDevices = async () => {
            try {
                const response = await axios.get('http://localhost:5000/remotes');
                const sortedDevices = response.data.sort((a, b) => a.serial_number.localeCompare(b.serial_number));
                setDevices(sortedDevices);
            } catch (error) {
                console.error('Error fetching devices:', error);
            }
        };

        fetchDevices();
    }, []);

    useEffect(() => {
        if (integrationData) {
            setIntegrationName(integrationData.integration_name || '');
            setAccessKey(integrationData.access_key || '');
            setAntaresAppName(integrationData.antares_app_name || '');
            setAntaresDeviceName(integrationData.antares_device_name || '');
            setDeviceId(integrationData.device_id || '');
        }
    }, [integrationData]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.patch(`http://localhost:5000/integrations/${integrationData.uuid}`, {
                integration_name: integrationName,
                access_key: accessKey,
                antares_app_name: antaresAppName,
                antares_device_name: antaresDeviceName,
                device_id: deviceId,
            });
            alert('Integration updated successfully');
            onClose();
            window.location.reload();
        } catch (error) {
            console.error('Error updating integration:', error);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <h2 className="text-2xl font-bold p-4">Update Integrasi</h2>
            <form onSubmit={handleSubmit} className="p-4">
                <div className="mb-4">
                    <label htmlFor="integrationName" className="block text-gray-700 text-sm font-bold mb-2">
                        Nama Integrasi<span className='text-orange-600'> *</span>
                    </label>
                    <input
                        type="text"
                        id="integrationName"
                        value={integrationName}
                        onChange={(e) => setIntegrationName(e.target.value)}
                        className="form-input mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-2 focus:border-orange-500 text-sm"
                        placeholder='Masukkan nama integrasi'
                        required
                    />
                    </div>
                <div className="mb-4">
                    <label htmlFor="accessKey" className="block text-gray-700 text-sm font-bold mb-2">
                        Access Key<span className='text-orange-600'> *</span>
                    </label>
                    <input
                        type="text"
                        id="accessKey"
                        value={accessKey}
                        onChange={(e) => setAccessKey(e.target.value)}
                        className="form-input mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-2 focus:border-orange-500 text-sm"
                        placeholder='Masukkan access key'
                        required
                    />
                    </div>
                <div className="mb-4">
                    <label htmlFor="antaresAppName" className="block text-gray-700 text-sm font-bold mb-2">
                        Application Name (dari Antares Platform)
                    </label>
                    <input
                        type="text"
                        id="antaresAppName"
                        value={antaresAppName}
                        onChange={(e) => setAntaresAppName(e.target.value)}
                        className="form-input mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-2 focus:border-orange-500 text-sm"
                        placeholder='Masukkan raw data 2'
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="antaresDeviceName" className="block text-gray-700 text-sm font-bold mb-2">
                        Device Name (dari Antares Platform)
                    </label>
                    <input
                        type="text"
                        id="antaresDeviceName"
                        value={antaresDeviceName}
                        onChange={(e) => setAntaresDeviceName(e.target.value)}
                        className="form-input mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-2 focus:border-orange-500 text-sm"
                        placeholder='Masukkan raw data 2'
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="snDevice" className="block text-gray-700 text-sm font-bold mb-2">
                        SN Device<span className='text-orange-600'> *</span>
                    </label>
                    <select
                        id="snDevice"
                        value={deviceId}
                        onChange={(e) => setDeviceId(e.target.value)}
                        className="form-select mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-2 focus:border-orange-500 text-sm"
                    >
                        <option value="" disabled className='mr-4'>Pilih SN Device</option>
                        {devices.map(device => (
                        <option key={device.id} value={device.id}>
                            {device.serial_number}
                        </option>
                        ))}
                    </select>
                </div>
                <button
                type="submit"
                className="w-full bg-orange-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                >
                Update Integrasi
                </button>
            </form>
        </Modal>
    )
}

export default UpdateIntegrationModal
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getMe } from '../features/authSlice'
import Layout from './Layout'
import DetailsDeviceManagerComponent from '../components/DetailsDeviceManagerComponent'

const DetailsDeviceManager = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isError } = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(getMe());
    }, [dispatch]);

    useEffect(() => {
        if (isError) {
            navigate("/");
        }
    }, [isError, navigate]);

    return (
        <Layout>
            <DetailsDeviceManagerComponent />
        </Layout>
    )
}

export default DetailsDeviceManager
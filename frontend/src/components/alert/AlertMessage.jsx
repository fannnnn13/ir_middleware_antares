import React from 'react';
import AlertModal from '../AlertModal'; 
import Success from '../../img/success.png';
import Failed from '../../img/failed.png';

const AlertMessage = ({ isOpen, onClose, message, isError}) => {
    return (
        <AlertModal isOpen={isOpen} onClose={onClose}>
            <div className={'container text-black pt-10 grid place-items-center'}>
                <img src={isError ? Failed : Success} alt={isError ? Failed : Success} className='w-11 mb-5'/>
                <p className='text-lg font-semibold'>{message}</p>
            </div>
        </AlertModal>
    );
};

export default AlertMessage;

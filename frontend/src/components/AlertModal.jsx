// Modal.js
import React from 'react';
import ReactDOM from 'react-dom';

const AlertModal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50 font-plusjakarta">
        <div className="bg-white rounded-lg shadow-lg w-screen max-w-sm p-5 relative">
            <button
            onClick={onClose}
            className="absolute top-10 right-10 text-black hover:bg-gray-300 rounded-md p-1"
            >
            <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
                />
            </svg>
            </button>
            {children}
        </div>
        </div>,
        document.body
    );
};

export default AlertModal;

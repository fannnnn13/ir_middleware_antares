import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Logo from '../img/logo antares IR.png'

const Sidebar = () => {
    const [activeItem, setActiveItem] = useState("dashboard");

    return (
        <div className="font-plusjakarta">
            <div className="container">
                <aside
                    id="sidebar"
                    className="fixed top-0 left-0 z-40 w-60 bg-gradient-to-tr from-yellow-500 via-red-600 to-black border-r border-black"
                >
                    <div className="h-screen px-0 py-0 grid grid-cols-1 content-between">
                        {/* Navbar and Logo */}
                        <div className="mb-auto">
                            {/* Logo */}
                            <div className="px-9 py-11">
                                <img src={Logo} alt="Logo Antares" />
                            </div>
                            {/* Sidebar */}
                            <ul className="font-medium px-0">
                                <li className="border-t border-black">
                                    <Link
                                        to="/dashboard"
                                        className={`flex items-center px-6 py-4 text-black bg-white ${
                                            activeItem === "dashboard"
                                                ? "border-l-14 border-orange-600"
                                                : ""
                                        }`}
                                        onClick={() =>
                                            setActiveItem("dashboard")
                                        }
                                    >
                                        <span>Dashboard</span>
                                    </Link>
                                </li>
                                <li className="border-t border-black">
                                    <Link
                                        to="/device-manager"
                                        className={`flex items-center px-6 py-4 text-black bg-white hover:bg-orange-300 ${
                                            activeItem === "device-manager"
                                                ? "border-l-14 border-orange-600"
                                                : ""
                                        }`}
                                        onClick={() =>
                                            setActiveItem("device-manager")
                                        }
                                    >
                                        <span className="ms-3">
                                            Device Manager
                                        </span>
                                    </Link>
                                </li>
                                <li className="border-t border-black">
                                    <Link
                                        to="/quick-match-manager"
                                        className={`flex items-center px-6 py-4 text-black bg-white hover:bg-orange-300 ${
                                            activeItem === "quick-match-manager"
                                                ? "border-l-14 border-orange-600"
                                                : ""
                                        }`}
                                        onClick={() =>
                                            setActiveItem("quick-match-manager")
                                        }
                                    >
                                        <span className="ms-3">
                                            Quick Match Manager
                                        </span>
                                    </Link>
                                </li>
                                <li className="border-y border-black">
                                    <Link
                                        to="/integration-menu"
                                        className={`flex items-center px-6 py-4 text-black bg-white hover:bg-orange-300 ${
                                            activeItem === "integration-menu"
                                                ? "border-l-14 border-orange-600"
                                                : ""
                                        }`}
                                        onClick={() =>
                                            setActiveItem("integration-menu")
                                        }
                                    >
                                        <span className="ms-3">
                                            Integration Menu
                                        </span>
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Userbar */}
                        <div className="px-8 py-7 bg-white">
                            <div id="account" className="grid grid-cols-3 mb-6">
                                <div className="my-auto">
                                    <img
                                        src="#"
                                        alt="User Avatar"
                                        className="w-12 h-12 rounded-full bg-gray-500"
                                    />
                                </div>
                                <div className="text-black col-span-2">
                                    <p className="text-lg font-medium">
                                        John Doe
                                    </p>
                                    <p className="text-sm font-normal">Admin</p>
                                </div>
                            </div>
                            <div id="accountButton">
                                <button
                                    type="button"
                                    className="text-white border-2 border-orange-500 rounded-md text-lg font-medium w-full py-2 text-center hover:bg-orange-500 mb-3"
                                >
                                    <Link
                                        to="/account"
                                        className="text-orange-500 flex items-center justify-between mx-7 hover:text-white"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="30"
                                            height="30"
                                            fill="currentColor"
                                            className="bi bi-person-fill"
                                            viewBox="0 0 16 16"
                                        >
                                            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                                        </svg>
                                        Account
                                    </Link>
                                </button>
                                <button
                                    type="button"
                                    className="text-white border-2 border-red-500 rounded-md text-lg font-medium w-full py-2 text-center hover:bg-red-500"
                                >
                                    <Link
                                        to="/logout"
                                        className="text-red-500 flex items-center justify-between mr-9 hover:text-white"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="29"
                                            height="29"
                                            fill="currentColor"
                                            className="bi bi-box-arrow-left ml-7"
                                            viewBox="0 0 16 16"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0z"
                                            />
                                            <path
                                                fillRule="evenodd"
                                                d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708z"
                                            />
                                        </svg>
                                        Logout
                                    </Link>
                                </button>
                            </div>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
}

export default Sidebar
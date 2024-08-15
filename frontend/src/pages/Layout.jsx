import React from 'react'
import Sidebar from '../components/Sidebar'

const Layout = ({ children }) => {
    return (
        <React.Fragment>
            <div className="grid grid-cols-5 min-h-screen font-plusjakarta">
                <div className="col-start-1 col-end-2">
                    <Sidebar />
                </div>
                <div className="col-start-2 col-span-5 mr-10">
                    <main>{children}</main>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Layout
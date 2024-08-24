import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import DetailsDevice from "./pages/DetailsDevice";
import QuickMatchManager from "./pages/QuickMatchManager";
import ListVariant from "./pages/ListVariant";
import DeviceManager from "./pages/DeviceManager";
import DetailsDeviceManager from "./pages/DetailsDeviceManager";
import IntegrationMenu from "./pages/IntegrationMenu";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
    return (
        <div className="">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route
                        path="/dashboard/details/:uuid"
                        element={<DetailsDevice />}
                    />
                    <Route
                        path="/quick-match-manager"
                        element={<QuickMatchManager />}
                    />
                    <Route
                        path="/quick-match-manager/variants/:uuid"
                        element={<ListVariant />}
                    />
                    <Route path="/device-manager" element={<DeviceManager />} />
                    <Route
                        path="/device-manager/details/:uuid"
                        element={<DetailsDeviceManager />}
                    />
                    <Route
                        path="/integration-menu"
                        element={<IntegrationMenu />}
                    />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;

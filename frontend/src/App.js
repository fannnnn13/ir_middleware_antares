import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import DetailsDevice from "./pages/DetailsDevice";
import QuickMatchManager from "./pages/QuickMatchManager";
import ListVariant from "./pages/ListVariant";
import DeviceManager from "./pages/DeviceManager";
import DetailsDeviceManager from "./pages/DetailsDeviceManager";

function App() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route
                        path="/details-device/:uuid"
                        element={<DetailsDevice />}
                    />
                    <Route
                        path="/quick-match-manager"
                        element={<QuickMatchManager />}
                    />
                    <Route
                        path="/brands/variants/:uuid"
                        element={<ListVariant />}
                    />
                    <Route path="/device-manager" element={<DeviceManager />} />
                    <Route
                        path="/device-manager/details/:uuid"
                        element={<DetailsDeviceManager />}
                    />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;

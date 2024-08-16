import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import DetailsDevice from "./pages/DetailsDevice";
import QuickMatchManager from "./pages/QuickMatchManager";

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
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;

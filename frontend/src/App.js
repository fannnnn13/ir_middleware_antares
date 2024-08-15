import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import DetailsDevice from "./pages/DetailsDevice";

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
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;

import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateProfile from "./components/CreateProfile";
import ProfilePage from "./pages/ProfilePage";
import QRCodePage from "./pages/QRCodePage";
import "./App.css";

function App() {  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CreateProfile />} />
        <Route path="/qr/:username" element={<QRCodePage />} />
        <Route path="/:username" element={<ProfilePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
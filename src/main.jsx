import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SkinDetails from './pages/SkinDetails'

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/skin/:encodedName" element={<SkinDetails />} />
        </Routes>
    </BrowserRouter>
)

import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SkinDetails from './pages/SkinDetails'
import Login from './pages/Login.jsx'
import { AuthProvider } from './services/AuthProvider.jsx'
import RequireAuth from './components/RequireAuth.jsx'

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <AuthProvider>
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route
                            path="/"
                            element={
                                <RequireAuth>
                                    <App />
                                </RequireAuth>
                            }
                        />
                        <Route
                            path="/skin/:encodedName"
                            element={
                                <RequireAuth>
                                    <SkinDetails />
                                </RequireAuth>
                            }
                        />
                    </Routes>
        </AuthProvider>
    </BrowserRouter>
)

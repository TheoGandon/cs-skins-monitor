import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SkinDetails from './pages/SkinDetails'
import Login from './pages/Login.jsx'
import { AuthProvider } from './services/AuthProvider.jsx'
import RequireAuth from './components/RequireAuth.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30 * 1000, 
    },
  },
})

// Connect to TanStack Query DevTools for development
window.__TANSTACK_QUERY_CLIENT__ = queryClient

createRoot(document.getElementById('root')).render(
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
)

import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthPage from './pages/AuthPage/AuthPage.jsx'
import PanelPage from './pages/PanelPage/PanelPage.jsx'
import Sidebar from './layout/Sidebar.jsx';


function App() {

    const isAuthorized = localStorage.getItem('token')
    const routing = isAuthorized ? (
        <>
            <Routes>
                <Route path="/" element={<Sidebar />}>
                    <Route index element={<PanelPage />} />
                    <Route path='panel' element={<PanelPage />} />
                    <Route path='bilets' element={<PanelPage />} />
                    <Route path='bilets-check' element={<PanelPage />} />
                    <Route path='flights' element={<PanelPage />} />
                    <Route path='airports' element={<PanelPage />} />
                    <Route path='planes' element={<PanelPage />} />
                </Route>
            </Routes>
        </>
    ) : (
        <>
            <Routes>
                <Route path='/' element={<AuthPage />} />
                <Route path='auth' element={<AuthPage />} />
                <Route path='*' element={<AuthPage />} />
            </Routes>
        </>
    )

    return (
        <>
            {routing}
            <ToastContainer />
        </>
    )
}

export default App

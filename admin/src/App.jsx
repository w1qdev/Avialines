import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import AuthPage from './pages/AuthPage/AuthPage.jsx'
import PanelPage from './pages/PanelPage/PanelPage.jsx'
import Sidebar from './layout/Sidebar.jsx';
import BiletsPage from './pages/BiletsPage/BiletsPage.jsx';
import BiletsCheckPage from './pages/biletsCheckPage/BiletsCheckPage.jsx';
import FlightsPage from './pages/FlightsPage/FlightsPage.jsx';
import AirportsPage from './pages/AirportsPage/AirportsPage.jsx';
import PlanesPage from './pages/PlanesPage/PlanesPage.jsx';
import AdminsPage from './pages/AdminsPage/AdminsPage.jsx';
import 'react-toastify/dist/ReactToastify.css';


function App() {

    const isAuthorized = localStorage.getItem('token')
    const routing = isAuthorized ? (
        <>
            <Routes>
                <Route path="/" element={<Sidebar />}>
                    <Route index element={<PanelPage />} />
                    <Route path='panel' element={<PanelPage />} />
                    <Route path='bilets' element={<BiletsPage />} />
                    <Route path='bilets-check' element={<BiletsCheckPage />} />
                    <Route path='flights' element={<FlightsPage />} />
                    <Route path='airports' element={<AirportsPage />} />
                    <Route path='planes' element={<PlanesPage />} />
                    <Route path='admins' element={<AdminsPage />} />
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

import { Link, Outlet } from "react-router-dom";
import Plane from '../assets/sidebar/plane.svg'
import Airport from '../assets/sidebar/airport.svg'
import Flight from '../assets/sidebar/flight.svg'
import Admin from '../assets/sidebar/admin.svg'
import Dashboard from '../assets/sidebar/dashboard.svg'
import Passenger from '../assets/sidebar/passenger.svg'
import NewPassenger from '../assets/sidebar/new_passenger.svg'


import './Sidebar.scss'



const Sidebar = () => {
    const fullName = localStorage.getItem('fullName')
    const adminType = localStorage.getItem('admin-type')
    const isMainAdmin = adminType === 'mainAdmin' ? (
        <>Главный администратор</>
    ) : (
        <>Администратор</>
    )

    return (
        <>
            <div className="sidebar">
                <div className="sidebar__logo">
                    URTK Avialines Panel
                </div>
                <Link to="/panel" className="sidebar__link">
                    <img src={Dashboard} alt="Главная панель" />
                    <div className="title">Главная панель</div>
                </Link>
                <Link to="/register-passenger" className="sidebar__link">
                    <img src={NewPassenger} alt="Регистрация пассажира на рейс" />
                    <div className="title">Регистрация пассажира</div>
                </Link>
                <Link to="/passengers" className="sidebar__link">
                    <img src={Passenger} alt="Управление пассажирами" />
                    <div className="title">Управление пассажирами</div>
                </Link>
                <Link to="/flights" className="sidebar__link">
                    <img src={Flight} alt="Управление рейсами" />
                    <div className="title">Рейсы</div>
                </Link>
                <Link to="/planes" className="sidebar__link">
                    <img src={Plane} alt="Управление самолетами" />
                    <div className="title">Самолеты</div>
                </Link>
                <Link to="/airports" className="sidebar__link">
                    <img src={Airport} alt="Управление аэрапортами" />
                    <div className="title">Аэрапорты</div>
                </Link>
                {adminType === "mainAdmin" ? (
                    <Link to="/admins" className="sidebar__link">
                        <img src={Admin} alt="Управление администраторами" />
                        <div className="title">Администраторы</div>
                    </Link>
                ) : null}

                <div className="sidebar__admin">
                    <div className="sidebar__admin-type">{isMainAdmin}</div>
                    <div className="sidebar__admin-fullname">{fullName}</div>
                </div>
            </div>
            <Outlet />
        </>
        
    )
}   

export default Sidebar;
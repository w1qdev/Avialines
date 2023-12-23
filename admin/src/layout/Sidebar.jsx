import { NavLink, Outlet } from "react-router-dom";
import Plane from '../assets/sidebar/plane.svg'
import Airport from '../assets/sidebar/airport.svg'
import Flight from '../assets/sidebar/flight.svg'
import Admin from '../assets/sidebar/admin.svg'
import Passenger from '../assets/sidebar/passenger.svg'
import NewPassenger from '../assets/sidebar/new_passenger.svg'
import Exit from '../assets/sidebar/exit.svg'
import { Tooltip } from "@chakra-ui/react";

import './Sidebar.scss'


const Sidebar = () => {
    // Компонент для навигации по админ-панели

    const fullName = localStorage.getItem('fullName')
    const adminType = localStorage.getItem('admin-type')
    const isMainAdmin = adminType === 'mainAdmin' ? (
        <>Главный администратор</>
    ) : (
        <>Администратор</>
    )

    const quitHandler = () => {
        localStorage.setItem('token', '')
        localStorage.setItem('admin-type', '')
        localStorage.setItem('fullName', '')

        window.location = '/auth'
    }

    const activeLinkHandler = ({ isActive }) => isActive ? 'sidebar__link active' : 'sidebar__link'

    return (
        <>
            <div className="sidebar">
                <div className="sidebar__logo">
                    URTK Airport Panel
                </div>
                <NavLink to="/register-passenger" className={activeLinkHandler}>
                    <img src={NewPassenger} alt="Регистрация пассажира на рейс" />
                    <div className="title">
                        <div className="title__main">Регистрация пассажира</div>
                        <div className="title__sub">Добавление пассажиров на рейс</div>
                    </div>
                </NavLink>
                <NavLink to="/passengers" className={activeLinkHandler}>
                    <img src={Passenger} alt="Управление пассажирами" />
                    <div className="title">
                        <div className="title__main">Управление пассажирами</div>
                        <div className="title__sub">Редактирование пассажиров</div>
                    </div>
                </NavLink>
                <NavLink to="/flights" className={activeLinkHandler}>
                    <img src={Flight} alt="Управление рейсами" />
                    <div className="title">
                        <div className="title__main">Рейсы</div>
                        <div className="title__sub">Создание рейсов</div>
                    </div>
                </NavLink>
                <NavLink to="/planes" className={activeLinkHandler}>
                    <img src={Plane} alt="Управление самолетами" />
                    <div className="title">
                        <div className="title__main">Самолеты</div>
                        <div className="title__sub">Создание самолетов</div>
                    </div>
                </NavLink>
                <NavLink to="/airports" className={activeLinkHandler}>
                    <img src={Airport} alt="Управление аэрапортами" />
                    <div className="title">
                        <div className="title__main">Аэропорты</div>
                        <div className="title__sub">Создание аэропортов</div>
                    </div>
                </NavLink>
                {adminType === "mainAdmin" ? (
                    <NavLink to="/admins" className={activeLinkHandler}>
                        <img src={Admin} alt="Управление администраторами" />
                        <div className="title">
                        <div className="title__main">Администраторы</div>
                        <div className="title__sub">Добавление администраторов</div>
                    </div>
                    </NavLink>
                ) : null}

                <div className="sidebar__admin">
                    <div className="sidebar__admin__info">
                        <div className="role">{isMainAdmin}</div>
                        <div className="fullname">{fullName}</div>    
                    </div>
                    <Tooltip 
                        label='Выйти из аккаунта' 
                        placement='right'
                        hasArrow 
                    >
                        <div 
                            className="sidebar__admin__quit"
                            onClick={quitHandler}
                        >
                            <img className="quit" src={Exit} alt="Выйти из аккаунта" /> 
                        </div>
                    </Tooltip>
                </div>
            </div>
            <Outlet />
        </>
        
    )
}   

export default Sidebar;
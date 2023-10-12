import { Link, Outlet } from "react-router-dom";
import ticket from '../../public/sidebar/ticket.svg'
import ticketCheck from '../../public/sidebar/check_bilets.svg'
import plane from '../../public/sidebar/plane.svg'
import airport from '../../public/sidebar/airport.svg'
import flight from '../../public/sidebar/flight.svg'
import admin from '../../public/sidebar/admin.svg'

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

                <Link to="/bilets" className="sidebar__link">
                    <img src={ticket} alt="Управление созданием билетов" />
                    <div className="text">Создание билета</div>
                </Link>
                <Link to="/bilets-check" className="sidebar__link">
                    <img src={ticketCheck} alt="Управление билетами" />
                    <div className="text">Проверка билетов</div>
                </Link>
                <Link to="/flights" className="sidebar__link">
                    <img src={flight} alt="Управление рейсами" />
                    <div className="text">Рейсы</div>
                </Link>
                <Link to="/planes" className="sidebar__link">
                    <img src={plane} alt="Управление самолетами" />
                    <div className="text">Самолеты</div>
                </Link>
                <Link to="/airports" className="sidebar__link">
                    <img src={airport} alt="Управление аэрапортами" />
                    <div className="text">Аэрапорты</div>
                </Link>
                {adminType === "mainAdmin" ? (
                    <Link to="/admins" className="sidebar__link">
                        <img src={admin} alt="Управление администраторами" />
                        <div className="text">Администраторы</div>
                    </Link>
                ) : (<>123</>)}

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
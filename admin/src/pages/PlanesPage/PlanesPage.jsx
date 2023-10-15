import axios from 'axios';
import { useState, useEffect } from 'react';
import { toastError } from '../../utils/toasts';
import { endpoints } from '../../api';
import TableItemCard from '../../components/TableItemCard/TableItemCard';
import './PlanesPage.scss'

const PlanesPage = () => {

    const [planes, setPlanes] = useState([])

    useEffect(() => {
        axios.get(`${endpoints.SERVER_ORIGIN_URI}${endpoints.PLANES.ROUTE}${endpoints.PLANES.GET_ALL}`)
        .then(res => {
            setPlanes(res.data.body)
        })
        .catch(err => {
            console.log(err)
            toastError("Кажется, что-то пошло не так, попробуйте позже")
        })
    }, [])


    return (
        <div className="dashboard">
            <div className="dashboard__container">
                <div className="dashboard__container__header">
                    <div className="sections">
                        <div className='button'>Самолеты</div>
                        <div className='button'>placeholder</div>
                    </div>
                    <div className="search">
                        <input type="text" placeholder='Поиск самолета (id, название)' />
                    </div>
                    <button className="create-new-button">Добавить самолет</button>
                </div>
                <div className="dashboard__container__body planes">
                    {planes.length && planes.map(plane => (
                        <TableItemCard key={plane.id} {...plane} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default PlanesPage;
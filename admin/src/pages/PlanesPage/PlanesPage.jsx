import axios from 'axios';
import { useState, useEffect } from 'react';
import { toastError } from '../../utils/toasts';
import { endpoints } from '../../api';
import TableItemCard from '../../components/TableItemCard/TableItemCard';
import CreatePlane from '../../components/Popups/CreatePlane';
import CircularProgressItem from '../../components/CircularProgress/CircularProgressItem';
import './PlanesPage.scss'

const PlanesPage = () => {

    const [planes, setPlanes] = useState([])
    const [isFetching, setIsFetching] = useState(false)
    const [isOpenPopup, setIsOpenPopup] = useState(false) 


    useEffect(() => {
        setIsFetching(true)
        axios.get(`${endpoints.SERVER_ORIGIN_URI}${endpoints.PLANES.ROUTE}${endpoints.PLANES.GET_ALL}`)
        .then(res => {
            setPlanes(res.data.body)
            setIsFetching(false)
        })
        .catch(err => {
            console.log(err)
            toastError("Кажется, что-то пошло не так, попробуйте позже")
            setIsFetching(false)
        })
    }, [])


    return (
        <>
            {isOpenPopup ? <CreatePlane title="Добавление нового самолета" popupHandlerFunc={setIsOpenPopup} /> : null}
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
                    <button 
                        className="create-new-button"
                        onClick={() => setIsOpenPopup(prev => !prev)}    
                    >Добавить самолет</button>
                </div>
                <div className="dashboard__container__body planes">
                    {planes.length ? planes.map(plane => (
                        <TableItemCard key={plane.id} {...plane} />
                    )) : (
                        <CircularProgressItem 
                            isTransparent={true} 
                            isFetching={isFetching} 
                        />
                    )}
                </div>
            </div>
        </div>
        </>
       
    )
}

export default PlanesPage;
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion'
import { socket } from '../../socket';
import PlaneTableItemCard from '../../components/TableItemCard/PlaneTableItemCard';
import CreatePlane from '../../components/Popups/CreatePlane';
import CircularProgressItem from '../../components/CircularProgress/CircularProgressItem';
import NoItems from '../../components/NoItems/NoItems';
import './PlanesPage.scss'

const PlanesPage = () => {
    // Страница со списком всех самолетов, а также их данных

    const [planes, setPlanes] = useState([])
    const [unChangedPlanes, setUnChangedPlanes] = useState([])
    const [isFetching, setIsFetching] = useState(false)
    const [isOpenPopup, setIsOpenPopup] = useState(false) 
    const [searchValue, setSearchValue] = useState('')    

    const searchHandler = (e) => {
        setSearchValue(e.target.value)
    
        const filteredPlanes = unChangedPlanes.filter(plane => {
            const foundByName = plane.planeType.toLowerCase().includes(e.target.value.toLowerCase())
            const foundByPlaceCount = plane.seatCount.toString().includes(e.target.value)

            if (foundByName || foundByPlaceCount) return true
        })

        if (filteredPlanes[0] != false) {
            setPlanes([...filteredPlanes])
        }

        if (e.target.value === '') {
            socket.emit('planesDataGet', {})
        }
    }


    useEffect(() => {
        setIsFetching(true)

        const onUpdate = () => {
            socket.emit('planesDataGet', onPlanesData)
        }
        
        const onPlanesData = (data) => {
            console.log(data)
        }
        
        const response = (data) => {
            if (data.body.length) {
                setPlanes(data.body)
                setUnChangedPlanes(data.body)
            }
            setIsFetching(false)
        }

        socket.on('planesResponse', response)
        socket.on('planesUpdate', onUpdate)
        socket.emit('planesDataGet', onPlanesData)

        return () => {
            socket.off('planesResponse', response);
            socket.off('planesUpdate', onUpdate);
            socket.off('planesDataGet', onPlanesData);
        }
    }, [])


    return (
        <>
            {isOpenPopup ? <CreatePlane title="Добавление нового самолета" popupHandlerFunc={setIsOpenPopup} /> : null}
            <div className="dashboard">
                <motion.div 
                    className="dashboard__container"
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 10, opacity: 0 }} 
                >
                    <div className="dashboard__container__header">
                        <div className="header__title">
                            <div className='title'>Самолеты</div>
                        </div>
                        <div className="search">
                            <input 
                                type="text" 
                                name="plane_search"
                                placeholder='Поиск самолета '
                                value={searchValue}
                                onChange={searchHandler}
                            />
                        </div>
                        <button 
                            className="create-new-button"
                            onClick={() => setIsOpenPopup(prev => !prev)}    
                        >Добавить самолет</button>
                    </div>
                    <div className="dashboard__container__body planes">
                        {planes.length ? planes.map(plane => (
                            <PlaneTableItemCard 
                                key={plane._id} 
                                {...plane} 
                            />
                        )) : (
                            <NoItems 
                                title="Самолеты не найдены 😔"
                                UpdateButton={true}
                                socketEmitEndpoint='isPlanesUpdate'
                            />
                        )}

                        {isFetching ? (
                            <CircularProgressItem 
                                isTransparent={true} 
                                isFetching={isFetching} 
                            />
                        ) : null}
                    </div>
                </motion.div>
            </div>
        </>
       
    )
}

export default PlanesPage;
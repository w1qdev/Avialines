import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import NoItems from '../../components/NoItems/NoItems'
import PassengerTableItemCard from '../../components/TableItemCard/PassengerTableItemCard'
import CircularProgressItem from '../../components/CircularProgress/CircularProgressItem'
import { socket } from '../../socket'
import { useState, useEffect, useRef } from 'react'
import { Kbd } from '@chakra-ui/react'
import './PassengersPage.scss'
import { useKeyPress } from '../../hooks/useKeyPress.js'
import Magnifier from '../../components/Icons/Magnifier.jsx'

const PassengersPage = () => {
    // Страница со списком всех пассажиров, а также их данных

    const searchInputRef = useRef()
    const isSearchKeyPressed = useKeyPress(['=', '+', 'Enter'], searchInputRef)
    const [isSearchValueFocused, setIsSearchValueFocused] = useState(false)
    const [isFetching, setIsFetching] = useState(false)
    const [passengers, setPassengers] = useState([])
    const [unChangedPassengers, setUnChangedPassengers] = useState([])
    const [searchValue, setSearchValue] = useState('')

    const searchHandler = (e) => {
        setSearchValue(e.target.value)
        
        const filteredPassengers = unChangedPassengers.filter(passenger => {
            const FoundByFullName = passenger.fullName.toLowerCase().includes(e.target.value.toLowerCase())
            const FoundByFlightNumber = passenger.flightNumber.toLowerCase().includes(e.target.value.toLowerCase())
            const FoundByPassport = passenger.passport.includes(e.target.value)
            const FoundBySeatNumber = passenger.seatNumber.toLowerCase().includes(e.target.value.toLowerCase())

            if (FoundByFullName || 
                FoundByPassport || 
                FoundBySeatNumber || 
                FoundByFlightNumber) 
            return true
        })

        if (filteredPassengers[0] != false) {
            setPassengers([...filteredPassengers])
        }

        if (e.target.value === '') {
            socket.emit('passengersDataGet', {})
        }
    }


    useEffect(() => {
        setIsFetching(true)

        const onUpdate = () => {
            socket.emit('passengersDataGet', onPassengersData)
        }

        const onPassengersData = (data) => {
            console.log(data)
        }

        const response = (data) => {
            if (data.body.length) {
                setPassengers(data.body)
                setUnChangedPassengers(data.body)
            }

            setIsFetching(false)
        }

        socket.on('passengersResponse', response);
        socket.on('passengersUpdate', onUpdate)
        socket.emit('passengersDataGet', onPassengersData);

        return () => {
            socket.off('passengersResponse', response);
            socket.off('passengersUpdate', onUpdate);
            socket.off('passengersDataGet', onPassengersData);
        }
    }, [])

    return (
        <div className="dashboard">
                <motion.div 
                    className="dashboard__container"
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 10, opacity: 0 }} 
                >
                    <div className="dashboard__container__header">
                        <div className="header__title">
                            <div className='title'>Управление пассажирами</div>
                        </div>
                        <div className="search">
                            <div 
                                className="search__input"
                                style={{ border: `${isSearchValueFocused ? "3px solid #778bff" : ""}` }}
                            >
                                <span className='magnifier'>
                                    <Magnifier className="magnifier__item" />
                                </span>
                                <input 
                                    type="text" 
                                    name="search"
                                    placeholder='Поиск пассажира'
                                    value={searchValue} 
                                    ref={searchInputRef}
                                    onChange={searchHandler}
                                    onFocus={() => setIsSearchValueFocused(true)}
                                    onBlur={() => setIsSearchValueFocused(false)}
                                />
                                <span className='keybind'>
                                    <Kbd colorScheme=''>enter</Kbd> <span>or</span> <Kbd>+</Kbd>
                                </span>
                            </div>
                        </div>
                        <Link 
                            className='create-new-button'
                            to='/register-passenger'
                        >
                            <button 
                                >Добавить пассажира
                            </button>
                        </Link>
                    </div>
                    <div className="dashboard__container__body">
                        {passengers.length ? passengers.map(passenger => (
                            <PassengerTableItemCard key={passenger._id} {...passenger} />
                        )) : (
                            <NoItems 
                                title="Пассажиров не найдено 😔"
                            />
                        )}

                        {isFetching ? <CircularProgressItem isFetching={isFetching} /> : null}
                    </div>
                </motion.div>
            </div>
    )
}

export default PassengersPage
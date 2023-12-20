import {
    Step,
    StepDescription,
    StepIcon,
    StepIndicator,
    StepNumber,
    StepSeparator,
    StepStatus,
    StepTitle,
    Stepper,
    Box,
  } from '@chakra-ui/react'
import { registerFormValidator } from '../../utils/registerFormValidator.js'
import { useState, useEffect, useRef } from 'react'
import { socket } from '../../socket.js'
import { motion } from 'framer-motion'
import NoItems from '../../components/NoItems/NoItems.jsx'
import CircularProgressItem from '../../components/CircularProgress/CircularProgressItem.jsx'
import RegisterPassengerFlightsCard from '../../components/TableItemCard/RegisterPassengerFlightsCard.jsx'
import { calculateLastCallTime } from '../../utils/calculateLastCallTime.js'
import './RegisterPassengerPage.scss'
import axios from 'axios'
import { toastError, toastInfo, toastSuccess } from '../../utils/toasts.js'
import { endpoints } from '../../api/index.js'
import { Spinner, Tooltip } from '@chakra-ui/react'
import { useReactToPrint } from 'react-to-print'



const steps = [
    { title: 'Знакомство', description: 'Данные пассажира' },
    { title: 'Рейс', description: 'Выбор рейса' },
    { title: 'Завершение', description: 'Выбор места в самолете' },
]


const FormContent = (props) => {

    const { currentStepIndex, flights, setFlights, unChangedFlights, formData, setFormData, printRef } = props

    const [flightsSearchValue, setFlightsSearchValue] = useState('')
    const [isValid, setIsValid] = useState({
        fullName: false,
        passportSeries: false,
        passportNumber: false,
        visitPurpose: false
    })

    const formDataHandler = (e) => {
        const inputName = e.target.name
        const inputValue = e.target.value
        
        // Validation
        if (registerFormValidator(inputName, inputValue)) {
            setIsValid({...isValid, [inputName]: true})
        } else {
            setIsValid({...isValid, [inputName]: false})
            setFormData({...formData, [inputName]: inputValue})
        }
    }

    const addPassengerPlace = (currentPlace) => {

        if (currentPlace.status != 'busy') {
            setFormData({ ...formData, seatNumber: currentPlace.seatName })
            toastInfo(`Место успешно выбрано: ${currentPlace.seatName}`)
            return
        }

        toastInfo("Данное место уже занято! Попробуйте выбрать другое")
    }

    const searchHandler = (e) => {
        setFlightsSearchValue(e.target.value)

        const filteredFlights = unChangedFlights.filter(flight => {
            const FoundByName =  flight.flightNumber.toLowerCase().includes(e.target.value.toLowerCase())
            const FoundByDepartureAirport = flight.departureAirport.toLowerCase().includes(e.target.value.toLowerCase())
            const FoundBydestinationAirport = flight.destinationAirport.toLowerCase().includes(e.target.value.toLowerCase())
            const FoundByPrice = flight.flightPrice.toString().includes(e.target.value)

            if (FoundByName ||
                FoundByDepartureAirport ||
                FoundBydestinationAirport ||
                FoundByPrice) return true
        })

        if (filteredFlights[0] != false) {
            setFlights([...filteredFlights])
        }

        if (e.target.value === '') {
            socket.emit('flightsDataGet', {})
        }
    }


    if (currentStepIndex === 0) {
        return (
            <form className="form">
                <div className="form__item">
                    <div className="form__item__inner"> 
                        <div className="label">Фамилия, Имя, Отчество (при наличии) пассажира  </div>
                        <input 
                            className={`input ${isValid.fullName ? 'valid' : ''}`}
                            type="text" 
                            placeholder='Иванов Иван Иванович'
                            name='fullName'
                            value={formData.fullName}
                            onChange={formDataHandler}
                        />
                    </div>
                    <div className="form__item__inner"> 
                        <div className="label">Введите паспортные данные пассажира</div>
                        <div className="multi">
                            <input 
                                className={`input ${isValid.passportSeries ? 'valid' : ''}`}
                                type="number" 
                                placeholder='Серия XXXX'
                                style={{ width: '49%' }}
                                name='passportSeries' 
                                value={formData.passportSeries}
                                onChange={formDataHandler}
                            />
                            <input 
                                className={`input ${isValid.passportNumber ? 'valid' : ''}`}
                                type="number" 
                                placeholder='Номер XXXXXX' 
                                style={{ width: '49%' }}
                                name='passportNumber'
                                value={formData.passportNumber}
                                onChange={formDataHandler}  
                            />
                        </div>
                    </div>
                </div>
            </form>
        )
    } else if (currentStepIndex === 1) {
        return (
            <motion.form 
                className='form section-2'
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 10, opacity: 0 }} 
            >                    
                <div className="search__item">
                    <input 
                        className='input' 
                        name='search'
                        type="text" 
                        placeholder='Поиск рейсов' 
                        value={flightsSearchValue}
                        onChange={e => searchHandler(e)}
                    />
                </div>
                <div className="search__result">
                    {flights.length ? flights.map(flight => (
                        <RegisterPassengerFlightsCard 
                            key={flight._id} 
                            {...flight} 
                            formData={formData}
                            setFormData={setFormData}
                        />
                    )) 
                        : 
                        <NoItems 
                            title="Рейсов не найдено 😔"
                            UpdateButton={false}
                        />
                    }
                </div>
            </motion.form>
        )
    } else if (currentStepIndex === 2) {
        return (
            <motion.form 
                className='form'
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 10, opacity: 0 }} 
            >
                <div className="plane__seats">
                    {formData.planeSeatPlaces?.length ? formData.planeSeatPlaces.map(place => {
                        return (
                            <>
                                {place.status === 'free' ? (
                                    <Tooltip hasArrow label={`Место ${place.seatName} свободно`} bg='#2c2c2c' color='#fff' placement='top'>
                                        <div 
                                            key={place.id} 
                                            className="item"
                                            onClick={() => addPassengerPlace(place)}
                                        >
                                            {place.seatName}
                                        </div>
                                    </Tooltip>
                                ) : (
                                    <Tooltip hasArrow label={`Место ${place.seatName} занято`} bg='#2c2c2c' color='#fff' placement='top'>
                                        <div 
                                            key={place.id} 
                                            className="item busy"
                                            onClick={() => addPassengerPlace(place)}
                                        >
                                            {place.seatName}
                                        </div>
                                    </Tooltip>
                                )}
                            </>
                        )
                        
                    }) : null}
                </div>

            </motion.form>
        )
    } else if (currentStepIndex >= 3) {
        return (
            <form 
                className='form'   
            >
                <motion.div 
                    className="result"
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 10, opacity: 0 }}     
                >
                    <div className='result__inner'>
                        <div 
                            className="result__inner__ticket"
                            ref={printRef}    
                        >
                            <div className="ticket__header">
                                <div className="ticket__header__title">Посадочный талон | Boarding pass</div>
                            </div>
                            <div className="ticket__content">
                                <div className="ticket__content__section">
                                    <div className="section__item">
                                        <div className="section__item__title">Выход / Gate</div>
                                        <div className="section__item__info">{formData.flightInfo.gate}</div>
                                    </div>
                                    <div className="section__item">
                                        <div className="section__item__title">Посадка / Boarding</div>
                                        <div className="section__item__info">{formData.flightInfo.date} | {formData.flightInfo.flightTime}</div>
                                    </div>
                                    <div className="section__item">
                                        <div className="section__item__title">Конец посадки / Last call</div>
                                        <div className="section__item__info warning">{formData.flightInfo.date} | {calculateLastCallTime(formData.flightInfo.flightTime)}</div>
                                    </div>
                                </div>
                                <div className="ticket__content__section">
                                    <div className="section__item">
                                        <div className="section__item__title">Пассажир / Passenger</div>
                                        <div className="section__item__info">{formData.fullName}</div>
                                    </div>
                                    <div className="section__item">
                                        <div className="section__item__title">Вылет / Departure</div>
                                        <div className="section__item__info">{formData.flightInfo.departureAirport}</div>
                                    </div>
                                    <div className="section__item">
                                        <div className="section__item__title">Место / Seat</div>
                                        <div className="section__item__info warning">{formData.seatNumber}</div>
                                    </div>
                                </div>
                                <div className="ticket__content__section">
                                    <div className="section__item">
                                        <div className="section__item__title">Цена рейса / Flight price</div>
                                        <div className="section__item__info">{formData.flightInfo.flightPrice}₽</div>
                                    </div>
                                    <div className="section__item">
                                        <div className="section__item__title">Прилет / Arrival</div>
                                        <div className="section__item__info">{formData.flightInfo.destinationAirport}</div>
                                    </div>
                                    <div className="section__item">
                                        <div className="section__item__title">Рейс / Flight</div>
                                        <div className="section__item__info">{formData.flightInfo.flightNumber}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

            </form>
        )
    }
}

const ButtonContent = ({ isCreateNewPassengerFetching, currentStepIndex, stepsLength }) => {
    if (isCreateNewPassengerFetching) {
        return <Spinner />
    } 

    if (currentStepIndex >= stepsLength) {
        return "Сохранить и распечатать билет"
    } else {
        return "Продолжить"
    }
}


const RegisterPassengerPage = () => {
    // Страница для регистрации нового пассажира

    const [currentStepIndex, setCurrentStepIndex] = useState(0)
    const [isFetching, setIsFetching] = useState(false)
    const [unChangedFlights, setUnChangedFlights] = useState([])
    const [isCreateNewPassengerFetching, setIsCreateNewPassengerFetching] = useState(false)
    const [flights, setFlights] = useState([])
    const handlePrint = useReactToPrint({content: () => printRef.current })
    const printRef = useRef();
    const [formData, setFormData] = useState({
        fullName: '',
        passportSeries: '',
        passportNumber: '',
        seatNumber: '',
        flightInfo: null,
        planeSeatPlaces: []
    })

    const nextStep = () => setCurrentStepIndex(prev => {
        const isPassengerDataFilled = !!(formData.fullName && formData.passportSeries && formData.passportNumber)
        if (prev + 1 <= 3 && isPassengerDataFilled) {
            return prev + 1
        } else {
            return prev
        }
    })
    const prevStep = () => setCurrentStepIndex(prev => prev - 1 >= 0 ? prev - 1 : prev)

    const savePassengerAndPrintTicket = async () => {
        setIsCreateNewPassengerFetching(prev => !prev)

        setFormData({ ...formData, planeSeatPlaces: null })

        await axios.post(`${endpoints.SERVER_ORIGIN_URI}${endpoints.PASSENGERS.ROUTE}${endpoints.PASSENGERS.CREATE}`, formData)
        .then(res => {
            if (res.data.error) {
                toastError("Данный пассажир уже существует")
                setIsCreateNewPassengerFetching(prev => !prev)
                return
            }
            toastSuccess("Новый пассажир успешно создан")
            setIsCreateNewPassengerFetching(prev => !prev)

            // print the ticket
            handlePrint()

            setTimeout(() => {
                window.location = '/register-passenger'
            }, 5000)
            
        })
        .catch(err => {
            if (err.body.error) {
                toastError("Что-то пошло не так, попробуйте позже")
            }
        })
    }

    useEffect(() => {
        setIsFetching(true)

        const onUpdate = () => {
            socket.emit('flightsDataGet', onFlightsData)
        }
        
        const onFlightsData = (data) => {
            console.log(data)
        }
        
        const response = (data) => {
            if (data.body.length) {
                setFlights(data.body)
                setUnChangedFlights(data.body)
            }
            setIsFetching(false)
        }

        socket.on('flightsResponse', response)
        socket.on('flightsUpdate', onUpdate)
        socket.emit('flightsDataGet', onFlightsData)

        return () => {
            socket.off('flightsResponse', response);
            socket.off('flightsUpdate', onUpdate);
            socket.off('flightsDataGet', onFlightsData);
        }
    }, [])

    return (
        <>
            {isFetching ? <CircularProgressItem isFetching={isFetching} /> : null}
            <motion.div 
                className="register-passenger__wrapper"
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 10, opacity: 0 }}
            >
                <Stepper index={currentStepIndex}>
                    {steps.map((step, index) => (
                        <Step key={index}>
                            <StepIndicator>
                                <StepStatus
                                    complete={<StepIcon />}
                                    incomplete={<StepNumber />}
                                    active={<StepNumber />}
                                />
                            </StepIndicator>

                            <Box flexShrink='0'>
                                <StepTitle>{step.title}</StepTitle>
                                <StepDescription>{step.description}</StepDescription>
                            </Box>
                            <StepSeparator />
                        </Step>
                    ))}
                </Stepper>
                    
                <FormContent 
                    currentStepIndex={currentStepIndex}  
                    flights={flights}
                    setFlights={setFlights}
                    unChangedFlights={unChangedFlights}
                    formData={formData}
                    setFormData={setFormData}
                    printRef={printRef}
                />

                <div className="buttons__wrapper">

                    {currentStepIndex >= 1 ? (
                        <motion.button 
                            className="cancel-step-button"
                            onClick={prevStep}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            >Обратно
                        </motion.button>
                    ) : (null)}
                    
                    
                    {currentStepIndex >= 3 ? (
                        <motion.button 
                            className="next-step-button finish"
                            onClick={savePassengerAndPrintTicket}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            >{<ButtonContent 
                                currentStepIndex={currentStepIndex}
                                isCreateNewPassengerFetching={isCreateNewPassengerFetching}
                                stepsLength={steps.length}
                            />}
                        </motion.button>
                    ) : (
                        <motion.button 
                            className="next-step-button"
                            onClick={nextStep}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            >{<ButtonContent 
                                currentStepIndex={currentStepIndex}
                                isCreateNewPassengerFetching={isCreateNewPassengerFetching}
                                stepsLength={steps.length}
                            />}
                        </motion.button>
                    )}

                    
                </div>
            </motion.div>
        </>
    )
}

export default RegisterPassengerPage
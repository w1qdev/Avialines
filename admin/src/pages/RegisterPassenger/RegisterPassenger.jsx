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
    Box
  } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { socket } from '../../socket.js'
import { motion } from 'framer-motion'
import CircularProgressItem from '../../components/CircularProgress/CircularProgressItem'
import './RegisterPassenger.scss'
import RegisterPassengerFlightsCard from '../../components/TableItemCard/RegisterPassengerFlightsCard'


const steps = [
    { title: 'Знакомство', description: 'Данные пассажира' },
    { title: 'Рейс', description: 'Выбор рейса' },
    { title: 'Завершение', description: 'Печать билета' },
]


const FormContent = ({ currentStepIndex, flights, formData, setFormData}) => {

    const formDataHandler = (e) => setFormData({...formData, [e.target.name]: e.target.value})

    if (currentStepIndex === 0) {
        return (
            <form className="form">
                <div className="form__item">
                    <div className="form__item__inner"> 
                        <div className="label">Фамилия, Имя и Отчество пассажира</div>
                        <input 
                            className='input' 
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
                                className='input' 
                                type="text" 
                                placeholder='Серия XXXX'
                                style={{ width: '49%' }}
                                name='passportSerial' 
                                value={formData.passportSeries}
                                onChange={formDataHandler}
                            />
                            <input 
                                className='input' 
                                type="text" 
                                placeholder='Номер XXXXXX' 
                                style={{ width: '49%' }}
                                name='passportNumber'
                                value={formData.passwportNumber}
                                onChange={formDataHandler}  
                            />
                        </div>
                    </div>
                </div>

                <div className="form__item">
                    <div className="form__item__inner">
                        <div className="label">Введите цель визита (опционально)</div>
                        <input 
                            className='input' 
                            type="text" 
                            placeholder='Цель визита'
                            name='visitPurpose'
                            value={formData.visitPurpose}
                            onChange={formDataHandler}  
                        />
                    </div>
                </div>
            </form>
        )
    } else if (currentStepIndex === 1) {

        console.log(flights)

        return (
            <motion.form 
                className='form section-2'
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 10, opacity: 0 }} 
            >                    
                <div className="search__item">
                    <input className='input' type="text" placeholder='Поиск рейса (id, Номер рейса, и др.)' />
                </div>
                <div className="search__result">
                    {flights.length ? flights.map(flight => {
                        <RegisterPassengerFlightsCard key={flight._id} {...flight} />
                    }) 
                        : null // TODO: NoItems component
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
            section 3
            </motion.form>
        )
    }
}



const RegisterPassengerPage = () => {
    
    const [currentStepIndex, setCurrentStepIndex] = useState(0)
    const [isFetching, setIsFetching] = useState(false)
    const [flights, setFlights] = useState([])
    const [formData, setFormData] = useState({
        fullName: '',
        passportSerial: '',
        passportNumber: '',
        visitPurpose: '',
        flightInfo: null
    })
    
    const buttonText = currentStepIndex >= 2 ? "Завершить" : "Продолжить"

    const nextStep = () => setCurrentStepIndex(prev => prev + 1 <= 3 ? prev + 1 : prev)
    const prevStep = () => setCurrentStepIndex(prev => prev - 1 >= 0 ? prev - 1 : prev)

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
                console.log(data.body)
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
                    formData={formData}
                    setFormData={setFormData}
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
                    
                    <motion.button 
                        className={`next-step-button ${currentStepIndex >= 2 ? 'finish' : ""}`}
                        onClick={nextStep}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        >{buttonText}
                    </motion.button>
                </div>
            </motion.div>
        </>
    )
}

export default RegisterPassengerPage
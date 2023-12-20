import Popup from './Popup'
import { 
    Menu, 
    MenuList, 
    MenuButton, 
    MenuItem, 
    Button 
} from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'
import { socket } from '../../socket'
import { endpoints } from '../../api'
import { motion } from 'framer-motion'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { toastError, toastSuccess } from '../../utils/toasts.js'
import { isDataFilled } from '../../utils/isDataFilled.js'
import { getCurrentMonthName } from '../../utils/getCurrentMonthName'


const CreateFlight = ({ title, popupHandlerFunc }) => {
    // Всплывающее окно для создания рейса

    const [responseData, setResponseData] = useState([])
    const [planesData, setPlanesData] = useState([])
    // const [isSubmitDisabled, setIsSubmitDisabled] = useState(false)
    const [formData, setFormData] = useState({
        departureAirport: "",
        departureAirportId: "",
        destinationAirport: "",
        destinationAirportId: "",
        currentPlane: "",
        currentPlaneId: "",
        flightPrice: "",
        date: "",
        gate: "",
        flightTime: ""
    })

    const selectAirport = (airport, target) => {
        switch (target) {
            case 'departure':
                setFormData({ 
                    ...formData, 
                    departureAirport: `${airport.airportName} - ${airport.airportPlace}`,
                    departureAirportId:  `${airport.airportId}`
                })
                break
            case 'destination':
                setFormData({ 
                    ...formData, 
                    destinationAirport: `${airport.airportName} - ${airport.airportPlace}`, 
                    destinationAirportId: `${airport.airportId}`
                })
        }       
    }

    const selectPlane = (plane) => {
        setFormData({ 
            ...formData, 
            currentPlane: plane.planeType,
            currentPlaneId: plane.id
        })
    } 

    const selectGate = (gate) => {
        setFormData({
            ...formData,
            gate
        })
    }

    useEffect(() => {
        // 'http://localhost:5000/api/airports/'
        axios.get(`${endpoints.SERVER_ORIGIN_URI}${endpoints.AIRPORTS.ROUTE}${endpoints.AIRPORTS.GET_ALL}`)
        .then(res => {
            setResponseData(res.data.body.sort((a, b) => a.airportName.localeCompare(b.airportName)))
        })
        .catch(() => {
            toastError("Не удалось загрузить список аэрапортов")
        })

        // http://localhost:5000/api/planes/
        axios.get(`${endpoints.SERVER_ORIGIN_URI}${endpoints.PLANES.ROUTE}${endpoints.PLANES.GET_FREE}`)
        .then(res => {
            setPlanesData(res.data.body)
        })
        .catch(() => {
            toastError("Не удалось загрузить список доступных самолетов")
        })

        const departureAirport = formData.departureAirport
        const destinationAirport = formData.destinationAirport

        if ((departureAirport != "" && destinationAirport != "") && (departureAirport === destinationAirport)) {
            toastError("Место назначения и вылета одинаковые!")
            setFormData({ ...formData, destinationAirport: "" })
        }     

    }, [formData])

    const createFlight = async (e) => {
        e.preventDefault()

        const isFormDataFilled = isDataFilled(formData)

        if (isFormDataFilled) {
            console.log(formData)
            toastError("Кажется, вы что-то не указали")
            return
        } 

        const date = new Date()
        const timestamp = `${date.getDate()} ${getCurrentMonthName(date.getMonth())} ${date.getFullYear()}`

        const flightDate = formData.date.replaceAll('-', '.')

        await axios.post('http://localhost:5000/api/flights/create', { 
            departureAirportId: formData.departureAirportId,
            departureAirport: formData.departureAirport,
            destinationAirportId: formData.destinationAirportId,
            destinationAirport: formData.destinationAirport,
            planeId: parseInt(formData.currentPlaneId),
            flightPrice: parseInt(formData.flightPrice),
            date: flightDate,
            adminFullName: localStorage.getItem('fullName'),
            flightTime: formData.flightTime,
            gate: formData.gate,
            timestamp,
        })
        .then((res) => {
            if (res.data.error) {
                toastError(res.data.error)
            } else {
                toastSuccess("Новый рейс успешно создан!")
                popupHandlerFunc(prev => !prev)
                socket.emit('isFlightsUpdate', { status: true })
            }
        })
        .catch(err => {
            console.log(err)
            toastError("Что-то пошло не так, рейс не был создан")
        })
    }

    return (
        <Popup title={title} popupHandlerFunc={popupHandlerFunc}>
            <form className='form' onSubmit={createFlight}>
                <div className="body__input">
                    <div className="item">
                        <div className="body__input__title">Аэрапорт вылета</div>
                        <Menu>
                            <MenuButton 
                                as={Button} 
                                rightIcon={<ChevronDownIcon />}
                                width={'100%'}
                                height={'47px'}
                                borderRadius={'8px'}
                                fontWeight={'500'}
                                >
                                {formData.departureAirport ? formData.departureAirport : "Аэрапорты вылета"}
                            </MenuButton>
                            <MenuList 
                                overflow={'auto'}
                                maxHeight={'230px'}
                                >
                                    {responseData.length >= 1 && responseData.map((airport) => (
                                        <MenuItem key={airport.airportId} onClick={() => selectAirport(airport, 'departure')}>{airport.airportName} - {airport.airportPlace}</MenuItem>
                                    ))}
                            </MenuList>
                        </Menu>
                    </div>
                    <div className="item">
                        <div className="body__input__title">Аэрапорт назначения</div>
                        <Menu>
                            <MenuButton 
                                as={Button} 
                                rightIcon={<ChevronDownIcon />}
                                width={'100%'}
                                height={'47px'}
                                borderRadius={'8px'}
                                fontWeight={'500'}
                                >
                                {formData.destinationAirport ? formData.destinationAirport : "Аэрапорты назначения"}
                            </MenuButton>
                            <MenuList 
                                overflow={'auto'}
                                maxHeight={'230px'}
                                >
                                {responseData.length >= 1 && responseData.map((airport) => (
                                    <MenuItem key={airport.airportId} onClick={() => selectAirport(airport, 'destination')}>{airport.airportName} - {airport.airportPlace}</MenuItem>
                                ))}
                            </MenuList>
                        </Menu>
                    </div>
                </div>

                <div className="body__input">
                    <div className="item">
                        <div className="body__input__title">Время посадки на рейс</div>
                        <div className="inputs__multiply">
                            <input 
                                style={{ width: '49%' }}
                                type="text" 
                                placeholder='20:00'
                                value={formData.flightTime}
                                onChange={e => setFormData({ ...formData, flightTime: e.target.value })}
                            />
                            <input 
                                className='date'
                                type="date" 
                                value={formData.date}
                                style={{ width: '49%' }}
                                onChange={e => setFormData({ ...formData, date: e.target.value })}
                            />
                        </div>
                    </div>
                    <div className="item">
                        <div className="body__input__title">Цена рейса (эконом) ₽</div>
                        <input 
                            type="number" 
                            placeholder='Цена рейса'
                            value={formData.flightPrice}
                            onChange={e => setFormData({ ...formData, flightPrice: e.target.value })} 
                        />
                    </div>
                </div>

                <div className="body__input">
                    <div className="item">
                        <div className="body__input__title">Самолет рейса</div>
                        <Menu>
                            <MenuButton 
                                as={Button} 
                                rightIcon={<ChevronDownIcon />}
                                width={'100%'}
                                height={'47px'}
                                borderRadius={'8px'}
                                fontWeight={'500'}
                                >
                                {formData.currentPlane ? formData.currentPlane : "Самолет рейса"}
                            </MenuButton>
                            <MenuList 
                                overflow={'auto'}
                                maxHeight={'230px'}
                                >
                                {planesData.length >= 1 && planesData.map((plane) => (
                                    <MenuItem key={plane.id} onClick={() => selectPlane(plane)}>{plane.planeType}</MenuItem>
                                ))}
                            </MenuList>
                        </Menu>
                    </div>

                    <div className="item">
                        <div className="body__input__title">Номер выхода</div>
                        <Menu>
                            <MenuButton 
                                as={Button} 
                                rightIcon={<ChevronDownIcon />}
                                width={'100%'}
                                height={'47px'}
                                borderRadius={'8px'}
                                fontWeight={'500'}
                                >
                                {formData.gate ? formData.gate : "Номер выхода"}
                            </MenuButton>
                            <MenuList 
                                overflow={'auto'}
                                maxHeight={'230px'}
                                >
                                    <MenuItem onClick={() => selectGate('1A')}>1A</MenuItem>
                                    <MenuItem onClick={() => selectGate('1B')}>1B</MenuItem>
                                    <MenuItem onClick={() => selectGate('1C')}>1C</MenuItem>
                                    <MenuItem onClick={() => selectGate('1D')}>1D</MenuItem>
                                    <MenuItem onClick={() => selectGate('1E')}>1E</MenuItem>
                                    <MenuItem onClick={() => selectGate('1F')}>1F</MenuItem>
                            </MenuList>
                        </Menu>
                    </div>
                </div>

                <div className="body__lower">
                    <motion.button 
                        type='submit'
                        // className={isSubmitDisabled ? `disabled` : ``}
                        // disabled={isSubmitDisabled}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.99 }}
                        transition={{ duration: 0.3 }}
                        >Создать новый рейс
                    </motion.button>
                </div>
            </form>
        </Popup>
    )
}

export default CreateFlight;
import Popup from './Popup'
import { 
    Menu, 
    MenuList, 
    MenuButton, 
    MenuItem, 
    Button 
} from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'
import { endpoints } from '../../api'
import { motion } from 'framer-motion'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { toastError, toastSuccess } from '../../utils/toasts.js'
import { isDataFilled } from '../../utils/isDataFilled.js'


const CreateFlight = ({ title, popupHandlerFunc }) => {

    const [responseData, setResponseData] = useState([])
    const [planesData, setPlanesData] = useState([])
    const [formData, setFormData] = useState({
        departureAirport: "",
        departureAirportId: "",
        destinationAirport: "",
        destinationAirportId: "",
        currentPlane: "",
        currentPlaneId: "",
        flightPrice: ""
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


    useEffect(() => {
        // 'http://localhost:5000/api/airports/'
        axios.get(`${endpoints.SERVER_ORIGIN_URI}${endpoints.AIRPORTS.ROUTE}${endpoints.AIRPORTS.GET_ALL}`)
        .then(res => {
            setResponseData(res.data.body)
        })
        .catch(() => {
            toastError("Не удалось загрузить список аэрапортов")
        })

        // http://localhost:5000/api/planes/
        axios.get(`${endpoints.SERVER_ORIGIN_URI}${endpoints.PLANES.ROUTE}${endpoints.PLANES.GET_ALL}`)
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
        console.log(formData)

        if (isFormDataFilled) {
            toastError("Кажется, вы что-то не указали")
            return
        } 

        await axios.post('http://localhost:5000/api/flights/create', { 
            departureAirportId: formData.departureAirportId,
            departureAirport: formData.departureAirport,
            destinationAirportId: formData.destinationAirportId,
            destinationAirport: formData.destinationAirport,
            planeId: parseInt(formData.currentPlaneId),
            flightPrice: parseInt(formData.flightPrice)
        })
        .then((res) => {
            if (res.data.error) {
                console.log(res)
                toastError(res.data.error)
            } else {
                console.log(res)
                toastSuccess("Новый рейс успешно создан!")
                popupHandlerFunc(prev => !prev)
            }
        })
        .catch(err => {
            console.log(err)
            toastError("Что-то пошло не так, рейс не был создан")
        })
    }

    return (
        <Popup title={title} popupHandlerFunc={popupHandlerFunc}>
            <form className='form'>
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
                        <div className="body__input__title">Время посадки</div>
                        <input type="text" placeholder='Длительность полета' />
                    </div>
                    <div className="item">
                        <div className="body__input__title">Цена рейса (эконом)</div>
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
                </div>

                <div className="body__lower">
                    <motion.button 
                        type='submit'
                        onClick={createFlight}
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
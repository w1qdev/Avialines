import { motion } from "framer-motion";
import { Menu, MenuButton, Button, MenuList, MenuItem } from "@chakra-ui/react";
import { ChevronDownIcon } from '@chakra-ui/icons';
import { useState, useEffect } from "react";
import { endpoints } from "../../api";
import { isDataFilled } from "../../utils/isDataFilled";
import { toastError, toastSuccess } from "../../utils/toasts";
import axios from "axios";
import { socket } from "../../socket";


const EditFlightsContent = ({ data, popupHandlerFunc }) => {
    // Компнонент редактирования данных выбранного рейса
    
    // Инициализация данных
    const [formData, setFormData] = useState({...data}) 
    const [airports, setAirports] = useState([])
    const [planes, setPlanes] = useState([])

    // Каждый раз при рендере компонента обновлять содержимое списков аэрапортов 
    useEffect(() => {
        // Запрос на сервер для получения списка аэрапортов
        axios.get(`${endpoints.SERVER_ORIGIN_URI}${endpoints.AIRPORTS.ROUTE}${endpoints.AIRPORTS.GET_ALL}`)
        .then(res => {
            // Обаботка исключений 
            if (res.data.error) {
                // Если в теле ответа от сервера есть поле error, 
                // то выводим сообщение об ошибке
                toastError("Не удалось загрузить список аэрапортов")
                // завершаем выполнение запросов на сервер
                return 
            }

            // Если все хорошо, обновляем список аэрапортов с сортировкой по алфавиту
            setAirports(res.data.body.sort((a, b) => a.airportName.localeCompare(b.airportName)))
        })
        .catch(() => {
            // Если произошла какая-то клиентская ошибка,
            // то показваем предупреждение об ошибке
            toastError("Не удалось загрузить список аэрапортов")
            // Завершаем выполнение запросов на сервер
            return
        })

        // Запрос на сервер для получения списка не занятых самолетов
        axios.get(`${endpoints.SERVER_ORIGIN_URI}${endpoints.PLANES.ROUTE}${endpoints.PLANES.GET_FREE}`)
        .then(res => {
            // Обработка исключений
            if (res.data.error) {
                // Если в теле ответа от сервера есть поле error, 
                // то показываем сообщение об ошибке
                toastError("Что-то пошло не так, попробуйте позже")
                // Завершаем выполнение запросов на сервер
                return
            }

            // Обновляем список доступных самолетов
            setPlanes(res.data.body)
        })
        .catch(() => {
            // Если произошла клиентская ошибка, то показываем 
            // сообщение об ошибке
            toastError("Не удалось загрузить список доступных самолетов")
            return
        })

        const departureAirport = formData.departureAirport
        const destinationAirport = formData.destinationAirport

        if ((departureAirport != "" && destinationAirport != "") && (departureAirport === destinationAirport)) {
            toastError("Место назначения и вылета одинаковые!")
            setFormData({ ...formData, destinationAirport: "" })
        }  


    }, [formData])




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
            lastFlightPlaneType: formData.flightPlaneType,
            lastFlightPlane: formData.flightPlane,
            flightPlaneType: plane.planeType,
            flightPlane: plane.id,
        })
    } 

    const saveChanges = (e) => {
        e.preventDefault() 

        console.log(formData)

        const isFormDataFilled = isDataFilled(formData)

        if (!isFormDataFilled) {
            toastError("Кажется, вы что-то не указали")
            return
        } 

        // TODO: add functionality
        axios.put(`${endpoints.SERVER_ORIGIN_URI}${endpoints.FLIGHTS.ROUTE}${endpoints.FLIGHTS.CHANGE}`, formData)
        .then(res => {
            if (res.data.error) {
                toastError("Что-то пошло не так, попробуйте позже")
                return
            }

            toastSuccess("Данные рейса успешно изменены")
            popupHandlerFunc(prev => !prev)
            socket.emit("isFlightsUpdate", { status: true })
        })
    }

    return (
        <form className="form" onSubmit={saveChanges}>
            <div className="body__input">
                <div className="item">
                    <div className="body__input__title">Аэрапорт вылеты</div>
                    <Menu>
                        <MenuButton 
                            as={Button} 
                            rightIcon={<ChevronDownIcon />}
                            width={'100%'}
                            height={'47px'}
                            borderRadius={'8px'}
                            fontWeight={'500'}
                            >
                            {formData.departureAirport ? formData.departureAirport : "Список мест"}
                        </MenuButton>
                        <MenuList 
                            overflow={'auto'}
                            maxHeight={'230px'}
                            >
                                {airports.length >= 1 && airports.map((airport) => (
                                    <MenuItem onClick={() => selectAirport(airport, 'departure')} key={airport.airportId}>{airport.airportName} - {airport.airportPlace}</MenuItem>
                                ))}
                        </MenuList>
                    </Menu>
                </div>
                <div className="item">
                    <div className="body__input__title">Аэрапорт прилета</div>
                    <Menu>
                        <MenuButton 
                            as={Button} 
                            rightIcon={<ChevronDownIcon />}
                            width={'100%'}
                            height={'47px'}
                            borderRadius={'8px'}
                            fontWeight={'500'}
                            >
                            {formData.destinationAirport ? formData.destinationAirport : "Список мест"}
                        </MenuButton>
                        <MenuList 
                            overflow={'auto'}
                            maxHeight={'230px'}
                            >
                                {airports.length >= 1 && airports.map((airport) => (
                                    <MenuItem onClick={() => selectAirport(airport, 'destination')} key={airport.airportId}>{airport.airportName} - {airport.airportPlace}</MenuItem>
                                ))}   
                        </MenuList>
                    </Menu>
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
                            {formData.flightPlaneType ? formData.flightPlaneType : "Список статусов"}
                        </MenuButton>
                        <MenuList 
                            overflow={'auto'}
                            maxHeight={'230px'}
                            >
                                {planes.length >= 1 && planes.map((plane) => (
                                    <MenuItem key={plane.id} onClick={() => selectPlane(plane)}>{plane.planeType}</MenuItem>
                                ))}
                        </MenuList>
                    </Menu>
                </div>
                <div className="item">
                    <div className="body__input__title">Цена рейса</div>
                    <input 
                        type="text" 
                        placeholder='Цена рейса'
                        value={formData.flightPrice}
                        onChange={e => setFormData({ ...formData, flightPrice: e.target.value })}
                    />
                </div>
            </div>

            <div className="body__lower">
                <motion.button 
                    type='submit'
                    className="save"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.99 }}
                    transition={{ duration: 0.3 }}
                    >Сохранить изменения
                </motion.button>
            </div>
        </form>
    )
}

export default EditFlightsContent;
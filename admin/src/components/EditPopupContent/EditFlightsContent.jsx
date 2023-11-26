import { motion } from "framer-motion";
import { Menu, MenuButton, Button, MenuList, MenuItem } from "@chakra-ui/react";
import { ChevronDownIcon } from '@chakra-ui/icons';
import { useState, useEffect } from "react";
import { endpoints } from "../../api";
import { isDataFilled } from "../../utils/isDataFilled";
import { toastError } from "../../utils/toasts";
import axios from "axios";


const EditFlightsContent = ({ data, popupHandlerFunc }) => {

    const [formData, setFormData] = useState({...data}) 
    const [airports, setAirports] = useState([])
    const [planes, setPlanes] = useState([])

    useEffect(() => {
        axios.get(`${endpoints.SERVER_ORIGIN_URI}${endpoints.AIRPORTS.ROUTE}${endpoints.AIRPORTS.GET_ALL}`)
        .then(res => {
            if (res.data.error) {
                toastError("Не удалось загрузить список аэрапортов")
                return 
            }

            setAirports(res.data.body)
        })
        .catch(() => {
            toastError("Не удалось загрузить список аэрапортов")
            return
        })

        axios.get(`${endpoints.SERVER_ORIGIN_URI}${endpoints.PLANES.ROUTE}${endpoints.PLANES.GET_FREE}`)
        .then(res => {
            if (res.data.error) {
                toastError("Что-то пошло не так, попробуйте позже")
                return
            }

            setPlanes(res.data.body)
        })
        .catch(() => {
            toastError("Не удалось загрузить список доступных самолетов")
            return
        })
    }, [])




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
            flightPlaneType: plane.planeType,
            flightPlane: plane.id
        })
    } 

    const saveChanges = (e) => {
        e.preventDefault() 

        console.log(formData)

        const isFormDataFilled = isDataFilled(formData)

        if (isFormDataFilled) {
            toastError("Кажется, вы что-то не указали")
            return
        } 

        // TODO: add functionality
    }

    return (
        <form className="form">
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
                    onClick={saveChanges}
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
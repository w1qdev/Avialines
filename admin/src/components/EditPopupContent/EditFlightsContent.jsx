import { motion } from "framer-motion";
import { Menu, MenuButton, Button, MenuList, MenuItem } from "@chakra-ui/react";
import { ChevronDownIcon } from '@chakra-ui/icons';
import { useState } from "react";

const EditFlightsContent = ({ data }) => {

    const [formData, setFormData] = useState({...data}) 

    const saveChanges = (e) => {
        e.preventDefault()        
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
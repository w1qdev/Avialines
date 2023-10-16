import { 
    Menu, 
    MenuList, 
    MenuButton, 
    MenuItem, 
    Button,
    Tooltip
} from '@chakra-ui/react'
import TableItemCard from './TableItemCard'
import { ChevronDownIcon } from '@chakra-ui/icons'
import './TableItemCard.scss'

const PlaneTableItemCard = ({ id, planeType, seatCount, status, planeCrew }) => {

    const crewItems = planeCrew.map(crew => {
        return <MenuItem zIndex={'100'} key={id} >{crew.fullName} ({crew.role})</MenuItem>
    })

    const currentStatus = status === 'free' ? 'Свободен' : 'Занят (в рейсе)'

    return (
        <TableItemCard >
            <tbody>
                <tr>
                    <td>Тип:</td>
                    <td>{planeType}</td>
                </tr>
                <tr>
                    <td>Вмещаемость:</td>
                    <td>{seatCount} мест</td>
                </tr>
                <tr>
                    <td>Занято: </td>
                    <td> мест</td>
                </tr>
                <tr>
                    <td>Свободно:</td>
                    <td> места</td>
                </tr>
            </tbody>



            <Menu>   
                <Tooltip hasArrow label='Посмотреть экипаж' bg='#2c2c2c' color='#fff' placement='top'>
                    <MenuButton
                        as={Button}
                        rightIcon={<ChevronDownIcon />}
                        textAlign={'left'}
                        marginBottom={'10px'}
                    >
                        Экипаж
                    </MenuButton>
                </Tooltip>
                <MenuList
                    overflow={'auto'}
                    maxHeight={'200px'}
                    zIndex={'dropdown'}
                    position={"relative"}
                    
                >
                    {crewItems}
                </MenuList>
            </Menu>

            <tbody className='status'>
                <tr>
                    <td>Статус:</td>
                    <Tooltip hasArrow label='Текущий статус самолета' bg='#2c2c2c' color='#fff' placement='top'>
                        <td className={`status-type ${status === 'free' ? 'free' : 'busy'}`}>
                            <span>{currentStatus}</span>
                        </td>
                    </Tooltip>
                </tr>
            </tbody>
        </TableItemCard>
    )
}

export default PlaneTableItemCard;
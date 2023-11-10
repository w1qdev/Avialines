import { 
    Menu, 
    // MenuList, 
    MenuButton, 
    MenuItem, 
    Button,
    Tooltip
} from '@chakra-ui/react'

// import Menu from '@mui/material/Menu';
// import MenuItem from '@mui/material/MenuItem';
import TableItemCard from './TableItemCard'
import './TableItemCard.scss'

const PlaneTableItemCard = ({ id, planeType, seatCount, status, freeSeatCount, busySeatCount, planeCrew }) => {

    // const crewItems = planeCrew.map(crew => {
    //     return <MenuItem zIndex={'100'} key={id} >{crew.fullName} ({crew.role})</MenuItem>
    // })

    const planeData = { id, planeType, seatCount, status }

    const currentStatus = status === 'free' ? 'Свободен' : 'Занят (в рейсе)'

    return (
        <TableItemCard data={planeData} itemId={id} itemCategory="planes" >
            <tbody>
                <tr>
                    <td>Тип</td>
                    <td>{planeType}</td>
                </tr>
                <tr>
                    <td>Вмещаемость</td>
                    <td>{seatCount} мест</td>
                </tr>
                <tr className={`${status === 'free' ? 'plane-free' : ''}`}>
                    <td>Занято</td>
                    <td>{busySeatCount != undefined ? busySeatCount : null} мест</td>
                </tr>
                <tr className={`${status === 'free' ? 'plane-free' : ''}`}>
                    <td>Свободно</td>
                    <td>{freeSeatCount != undefined && status === 'busy' ? freeSeatCount : null} мест</td>
                </tr>
            </tbody>


            {/* <Menu>   
                <Tooltip hasArrow label='Посмотреть экипаж' bg='#2c2c2c' color='#fff' placement='top'>
                    <MenuButton
                        as={Button}
                        rightIcon={<ChevronDownIcon />}
                        textAlign={'left'}
                        marginBottom={'10px'}
                        onClick={handleClick}
                    >
                        Экипаж
                    </MenuButton>
                </Tooltip>
            </Menu> */}

            <tbody className='status'>
                <tr>
                    <td>Статус</td>
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
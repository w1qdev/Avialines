import { 
    Menu, 
    MenuList, 
    MenuButton, 
    MenuItem, 
    Button 
} from '@chakra-ui/react'
import Trash from '../../assets/card/trash.svg'
import Pencil from '../../assets/card/pencil.svg'
import { ChevronDownIcon } from '@chakra-ui/icons'
import './TableItemCard.scss'


const TableItemCard = ({ id, planeType, seatCount, status, planeCrew }) => {

    const crewItems = planeCrew.map(crew => {
        return <MenuItem style={{ zIndex: "1000" }} key={crew.id} >{crew.fullName} ({crew.role})</MenuItem>
    })

    const currentStatus = status === 'free' ? 'Свободен' : 'Занят (в рейсе)'


    return (
        <div className="body__item">

            <div className="body__item__tools">
                <div className="tool__item">
                    <img src={Trash} alt="Удалить" />
                </div>
                <div className="tool__item">
                    <img src={Pencil} alt="Редактировать" />
                </div>  
            </div>

            <table>
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
            </table>

            <Menu>
                <MenuButton
                    as={Button}
                    rightIcon={<ChevronDownIcon />}
                >
                    Экипаж
                </MenuButton>
                <MenuList
                    overflow={'auto'}
                    maxHeight={'200px'}
                >
                    {crewItems}
                </MenuList>
            </Menu>

            <table className='status'>
                <tr>
                    <td>Статус:</td>
                    <td className={`status-type ${status === 'free' ? 'free' : 'busy'}`}>{currentStatus}</td>
                </tr>
            </table>
        </div>
    )
}   

export default TableItemCard;
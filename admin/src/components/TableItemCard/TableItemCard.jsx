import Trash from '../../assets/card/trash.svg'
import Pencil from '../../assets/card/pencil.svg'
import { Tooltip } from '@chakra-ui/react'
import './TableItemCard.scss'


const TableItemCard = ({ children }) => {


    return (
        <div className="body__item">

            <div className="body__item__tools">
                <Tooltip hasArrow label='Удалить' bg='#2c2c2c' color='#fff' placement='right'>
                    <div className="tool__item">
                        <img src={Trash} alt="Удалить" />
                    </div>
                </Tooltip>
                <Tooltip hasArrow label='Редактировать' bg='#2c2c2c' color='#fff' placement='right'>
                    <div className="tool__item">
                        <img src={Pencil} alt="Редактировать" />
                    </div>  
                </Tooltip>
                
            </div>
            {children}
        </div>
    )
}   

export default TableItemCard;
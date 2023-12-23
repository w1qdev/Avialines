import { Tooltip } from '@chakra-ui/react'
import TableItemCard from './TableItemCard'
import './TableItemCard.scss'

const PlaneTableItemCard = (props) => {
    // Компонент для отобрадения данных самолета в виде карточки

    const { id, planeType, seatCount, status, freeSeatCount, busySeatCount, planeCompany } = props
    const planeData = { id, planeType, seatCount, status }

    const currentStatus = status === 'free' ? 'Свободен' : 'Занят (в рейсе)'

    return (
        <TableItemCard data={planeData} itemId={id} itemCategory="planes" >
            <div className='table-item'>
                <tr>
                    <td>Тип</td>
                    <td>{planeType}</td>
                </tr>
                <tr>
                    <td>Компания</td>
                    <td>{planeCompany}</td>
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
            </div>

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
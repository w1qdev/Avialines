import { motion } from 'framer-motion'
import { socket } from '../../socket'
import './NoItems.scss'


const NoItems = ({ title, UpdateButton = true, socketEmitEndpoint = "isFlightsUpdate" }) => {
    // Компонент отвечающий за обновление данных на странице если данных для отображения нет

    const Update = () => {
        socket.emit(socketEmitEndpoint, { status: true })
    }

    return(
        <div className="no-items">
            <div className="no-items__container">
                <div className="title">{title}</div>
                {UpdateButton ? (
                <motion.button 
                    className='update'
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={Update}
                >Обновить</motion.button>) : null }
            </div>
        </div>
    )
}


export default NoItems
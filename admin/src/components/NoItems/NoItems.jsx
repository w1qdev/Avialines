import { motion } from 'framer-motion'
import { socket } from '../../socket'
import './NoItems.scss'


const NoItems = ({ title, socketEmitEndpoint }) => {

    const Update = () => {
        socket.emit(socketEmitEndpoint, { status: true })
    }

    return(
        <div 
            className="no-items"
        >
            <div className="no-items__container">
                <div className="title">{title}</div>
                <motion.button 
                    className='update'
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={Update}
                >Обновить</motion.button>
            </div>
        </div>
    )
}


export default NoItems
import './CircularProgressItem.scss'
import { CircularProgress  } from '@chakra-ui/react'


const CircularProgressItem = ({ isFetching, isTransparent }) => {
    // Компонент прогресса загрузки

    return (
        <div className={`progress ${isTransparent ? 'transparent' : ''}`} style={ isFetching ? { opacity: 1, zIndex: 1 } : { opacity: 0, zIndex: -1 }}>
            <CircularProgress isIndeterminate color="green.300" />
        </div>
    )
}

export default CircularProgressItem;
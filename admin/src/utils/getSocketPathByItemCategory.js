
const socketPaths = {
    'flights': 'isFlightsUpdate',
    'planes': 'isPlanesUpdate',
    'airports': 'isAirportsUpdate',
    'admins': 'isAdminsUpdate',
    'passengers': 'isPassengersUpdate' 
}

const getSocketPathByItemCategory = (itemCategory) => {
    return socketPaths[itemCategory]
}

export default getSocketPathByItemCategory
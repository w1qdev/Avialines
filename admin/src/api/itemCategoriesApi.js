import { endpoints } from "."

const flightsPath = `${endpoints.SERVER_ORIGIN_URI}${endpoints.FLIGHTS.ROUTE}${endpoints.FLIGHTS.REMOVE}`
const planesPath = `${endpoints.SERVER_ORIGIN_URI}${endpoints.PLANES.ROUTE}${endpoints.PLANES.REMOVE}`
const airportsPath = `${endpoints.SERVER_ORIGIN_URI}${endpoints.AIRPORTS.ROUTE}${endpoints.AIRPORTS.REMOVE}`
const adminsPath = `${endpoints.SERVER_ORIGIN_URI}${endpoints.ADMINS.ROUTE}${endpoints.ADMINS.REMOVE}`
const passengers = `${endpoints.SERVER_ORIGIN_URI}${endpoints.PASSENGERS.ROUTE}${endpoints.PASSENGERS.REMOVE}`

export const itemCategories = {
    'flights': flightsPath,
    'planes': planesPath,
    'airports': airportsPath, 
    'admins': adminsPath,
    'passengers': passengers
}
import axios from "axios"
import { endpoints } from "."
import { toastError } from "../utils/toasts"


const getFlights = async () => {
    await axios.get(`${endpoints.SERVER_ORIGIN_URI}${endpoints.FLIGHTS.ROUTE}${endpoints.FLIGHTS.GET_ALL}`)
    .then(res => {
        if (res.data.error) {
            toastError("Что-то пошло не так, попробуйте позже")
            return
        }

        return res.data.body
    })
    .catch(err => {
        console.log(err)
        toastError("Что-то пошло не так, попробуйте позже")
        return
    })
}

export default getFlights
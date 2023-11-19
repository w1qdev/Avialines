import axios from "axios"
import { endpoints } from "."
import { toastError } from "../utils/toasts"


const getAirports = async () => {
    axios.get(`${endpoints.SERVER_ORIGIN_URI}${endpoints.AIRPORTS.ROUTE}${endpoints.AIRPORTS.GET_ALL}`)
    .then(res => {
        if (res.data.error) {
            toastError("Не удалось загрузить список аэрапортов")
            return 
        }

        return res.data.body
    })
    .catch(err => {
        console.log(err)
        toastError("Не удалось загрузить список аэрапортов")
        return
    })
}

export default getAirports
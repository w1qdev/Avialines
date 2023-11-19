import axios from "axios"
import { endpoints } from "."
import { toastError } from "../utils/toasts"


const getPlanes = async () => {
    await axios.get(`${endpoints.SERVER_ORIGIN_URI}${endpoints.PLANES.ROUTE}${endpoints.PLANES.GET_FREE}`)
    .then(res => {
        if (res.data.error) {
            toastError("Что-то пошло не так, попробуйте позже")
            return
        }

        return res.data.body
    })
    .catch(() => {
        toastError("Не удалось загрузить список доступных самолетов")
        return
    })
}


export default getPlanes
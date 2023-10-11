import { toast } from 'react-toastify'

const toastConfig = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
}

export const toastSuccess = (text) => {
    toast.success(text, toastConfig);
}

export const toastError = (text) => {
    toast.error(text, toastConfig);
}

export const toastInfo = (text) => {
    toast.info(text, toastConfig);
}

export const toastWarning = (text) => {
    toast.warning(text, toastConfig);
}


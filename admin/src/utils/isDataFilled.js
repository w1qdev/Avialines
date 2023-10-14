export const isDataFilled = (data) => {
    const dataCopy = {...data}

    for (let key of Object.keys(dataCopy)) {
        if (!dataCopy[key]){
            return true
        }
    }
    return false
}
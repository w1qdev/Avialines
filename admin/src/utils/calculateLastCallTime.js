// Функция для получения времени вылета зная время начала посадки на рейс 

export const calculateLastCallTime = (time) => {
    const timeList = time.split(":")
    let hours = parseInt(timeList[0])
    let minutes = parseInt(timeList[1])
    const lastCallTimeCount = 20 // for example: 14:20 + 20 = 14:40

    if (minutes + lastCallTimeCount > 60) {
        hours += 1
        minutes += lastCallTimeCount % 60
    } else {
        minutes += lastCallTimeCount
    }

    return `${hours}:${minutes}`
}
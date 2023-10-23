import { getRandomNumber } from "./getRandomNumber.js"

export const getPlanePlaces = (placeCount) => {
    const letters = 'abcdefghijklmnopqrstuvwxyz'
    const numbers = '123456789'
    const planePlaces = []

    for (let i = 0; i < placeCount; i++) {
        const randomPlace = `${letters[getRandomNumber(letters.length)]}${numbers[getRandomNumber(numbers.length)]}`
        planePlaces.push(randomPlace)
    }

    return planePlaces
}





import { getRandomNumber } from "./getRandomNumber.js"


export const getPlanePlaces = ( placeCount ) => {
    const letters = 'abcdef'
    const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 
                        '10', '11', '12', '13', '14', '15', '16', '17',
                        '18', '19', '20', '21', '22', '23', '24', '25', '25']
    const planePlaces = []

    
    for (let i = 0; i < numbers.length; i++) {
        for (let j = 0; j < letters.length; j++) {
            if (planePlaces.length >= placeCount) {
                return planePlaces
            }

            const placeName = `${numbers[i]}${letters[j]}`
            planePlaces.push({
                id: getRandomNumber(100000),
                seatName: placeName,
                status: 'free'
            })
        }
    }

    return planePlaces
}





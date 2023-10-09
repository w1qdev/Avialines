const getRandomValue = (max) => {
    return Math.floor(Math.random() * max)
}

export const createFlightNumber = () => {
    const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H',
                    'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q',
                    'R', 'S', 'T', 'X', 'Y', 'Z']
    const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

    const flightNumber = ""

    for (let i = 0; i <= alphabet.length; i++) {
        if (flightNumber.length <= 3) {
            flightNumber += alphabet[getRandomValue(alphabet.length - 1)]
        } else if (flightNumber.length <= 6) {
            flightNumber += numbers[getRandomValue(numbers.length - 1)]
        } else {
            return flightNumber;
        }
    }
}

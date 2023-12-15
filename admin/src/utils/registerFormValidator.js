// name - e.target.name
// value - e.target.value

export const registerFormValidator = (name, value) => {
    switch (name){
        case 'fullName':
            if (value.split(' ').length === 4) {
                return true
            }
            break

        case 'passportSeries':
            if (value.length === 5) {
                return true
            }
            break

        case 'passportNumber':
            if (value.length === 7) {
                return true
            }
            break
            
    }
}
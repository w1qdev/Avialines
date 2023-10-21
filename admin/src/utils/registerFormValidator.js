// name - e.target.name
// value - e.target.value

export const registerFormValidator = (name, value) => {
    switch (name){
        case 'fullName':
            if (value.split(' ').length === 3) {
                return true
            }
            break

        case 'passportSeries':
            if (value.length === 4) {
                return true
            }
            break

        case 'passportNumber':
            if (value.length === 6) {
                return true
            }
            break
            
    }
}
// Функция для получение текущего месяца зная номер месяца

export const getCurrentMonthName = (month) => {
    const months = ['Января', 'Февраля', 'Марта', 'Мая', 'Апреля', 'Июня', 'Июля', 
                    'Августа', 'Сентября', 'Октября', 'Ноября', 'Декаря']

    return months[month]
}
import Flight from "../models/Flight.js";
import { info } from "./chalk.js";

const checkFlightStatusByTime = () => {
    const checkInterval = 1000 * 5 // * 60 * 5 // 5 hours
    
    setInterval(async () => {
        let flightStatusesChanged = 0
        const flightWithNewStatus = []
        const currentTime = {
            hour: 22,
            min: 0,
            year: 0,
            month: 0,
            day: 0
        }

        const flightsList = await Flight.find()

        flightsList.forEach(flight => {
            const flightTimeList = flight.flightTime.split(':')
            const flightDateList = flight.date.split('.')

            const flightTimeData = {
                hour: parseInt(flightTimeList[0]),
                min: parseInt(flightTimeList[1]),
                year: parseInt(flightDateList[0]),
                month: parseInt(flightDateList[1]),
                day: parseInt(flightDateList[2])
            }       

            

            const isFlightStatusShouldBeChanged = currentTime.year > flightTimeData.year ||
                                                    currentTime.month > flightTimeData.month ||
                                                    currentTime.day > flightTimeData.day ||
                                                    currentTime.hour > flightTimeData.hour ||
                                                    currentTime.min > flightTimeData.min

            console.log(isFlightStatusShouldBeChanged)
            console.log(currentTime.year > flightTimeData.year)
            console.log(currentTime.month > flightTimeData.month)
            console.log(currentTime.day > flightTimeData.day)
            console.log(currentTime.hour > flightTimeData.hour)
            console.log(currentTime.min > flightTimeData.min)


            if (isFlightStatusShouldBeChanged) {
                flightWithNewStatus.push(flight)
            }
        })

        if (flightWithNewStatus.length) {
            for (let i = 0; i < flightWithNewStatus.length; i++) {
                if (flightWithNewStatus[i].flightStatus === '') {
                    await Flight.findOneAndUpdate({ flightId: flightWithNewStatus[i].flightId }, { flightStatus: 'active' })
                    flightStatusesChanged += 1
                }
            }
        }


        console.log(info(`flights changed: ${flightStatusesChanged}`))
    }, checkInterval)
}

export default checkFlightStatusByTime;
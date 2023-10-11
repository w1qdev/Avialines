import { airportRouter } from "./airports.router.js";
import { departureRouter } from "./departures.router.js";
import { flightRouter } from "./flights.router.js";
import { passengerRouter } from "./passengers.router.js";
import { planeRouter } from "./planes.router.js";
import { adminRouter } from "./admin.router.js";

export const router = {
    airportRouter,
    departureRouter,
    flightRouter,
    passengerRouter,
    planeRouter,
    adminRouter
} 
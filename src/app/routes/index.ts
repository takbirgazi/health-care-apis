import { Router } from "express";
import { userRoutes } from "../modules/user/user.route";
import { authRoutes } from "../modules/auth/auth.route";
import { ScheduleRoutes } from "../modules/schedule/schedule.route";
import { doctorScheduleRoutes } from "../modules/doctorSchedule/doctorSchedule.route";
import { DoctorRoutes } from "../modules/doctor/doctor.route";



export const router = Router();

const moduleRoute = [
    {
        path: "/user",
        route: userRoutes
    },
    {
        path: "/auth",
        route: authRoutes
    },
    {
        path: '/schedule',
        route: ScheduleRoutes
    },
    {
        path: '/doctor-schedule',
        route: doctorScheduleRoutes
    },
    {
        path: '/doctor',
        route: DoctorRoutes
    }
]

moduleRoute.forEach(route => {
    router.use(route.path, route.route);
})
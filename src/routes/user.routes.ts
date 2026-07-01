import { Router } from "express";

export const userRoutes = Router()

userRoutes.post('', (req, res) => {
    return res.status(200).send("foi")
})
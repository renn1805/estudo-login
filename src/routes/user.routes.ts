import { Router } from "express";
import * as z from 'zod'
import { userController } from "../controllers/user-controller";

export const userRoutes = Router()

userRoutes.post('', (req, res) => userController.create(req, res))
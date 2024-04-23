import {Router} from "express";
import AuthController from "../../packages/auth/controller/AuthController.js";
import {body} from "express-validator";

const authRouter = Router()
const rules = [
    body('email').isEmail(),
    body('password').isLength({min: 8, max: 32}),
]

authRouter.post('/register', ...rules, AuthController.register)
authRouter.post('/login', ...rules, AuthController.login)
authRouter.get('/logout', AuthController.logout)
authRouter.get('/refresh', AuthController.refresh)

export default authRouter
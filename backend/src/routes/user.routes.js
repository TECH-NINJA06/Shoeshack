import registerUser from "../controllers/users.controllers"
import {Router} from 'express'

const router = Router()


router.route("/signup").post(registerUser)
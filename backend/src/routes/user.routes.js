import registerUser from "../controllers/users.controllers.js"
import {Router} from 'express'

const router = Router()


router.route("/signup").post(registerUser)

export default router
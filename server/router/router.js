import express, {Router} from "express";
import authRouter from "./nested/auth.js";
import schoolBoyRouter from "./nested/schoolBoy.js";
import genderRouter from "./nested/gender.js";
import parentRouter from "./nested/parent.js";
import schoolRouter from "./nested/school.js";
import classRouter from "./nested/class.js";
import teacherRouter from "./nested/teacher.js";
import instaRouter from "./nested/insta.js";
import {dirname, join} from "path";
import {fileURLToPath} from "url";

const router = Router()

router.use('/auth', authRouter)
router.use('/schoolBoy', schoolBoyRouter)
router.use('/parent', parentRouter)
router.use('/gender', genderRouter)
router.use('/school', schoolRouter)
router.use('/class', classRouter)
router.use('/teacher', teacherRouter)

router.use('/instagram', instaRouter)
router.use('/images', express.static(join(dirname(dirname(fileURLToPath(import.meta.url))), 'packages', 'insta', 'images')))

export default router
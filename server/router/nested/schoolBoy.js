import {Router} from "express";
import {body} from "express-validator";
import SchoolBoyController from "../../packages/schoolBoy/SchoolBoyController.js";

const schoolBoyRouter = Router()

schoolBoyRouter.get('/', SchoolBoyController.getAll)
schoolBoyRouter.get('/:id', SchoolBoyController.getById)

const rules = [
    body('firstName').isString(),
    body('lastName').isString(),
    body('birthday').isISO8601(),
    body('email').isEmail(),
    body('phone').isString(),
    body('instagram').isString(),
    body('genderId').isInt(),
    body('schoolId').isInt(),
    body('classId').isInt(),
    body('teacherId').isInt(),
    body('parentId').isArray(),
]

schoolBoyRouter.post('/', ...rules, SchoolBoyController.create)

schoolBoyRouter.put('/:id', ...rules, SchoolBoyController.update)

schoolBoyRouter.delete('/:id', SchoolBoyController.delete)

export default schoolBoyRouter
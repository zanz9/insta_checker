import {Router} from "express";
import {body} from "express-validator";
import TeacherController from "../../packages/teacher/TeacherController.js";

const teacherRouter = Router()

teacherRouter.get('/', TeacherController.getAll)
teacherRouter.get('/:id', TeacherController.getById)
teacherRouter.post('/', ...[
    body('firstName').isString(),
    body('lastName').isString(),
    body('phone').isString()
], TeacherController.create)
teacherRouter.put('/:id', TeacherController.update)
teacherRouter.delete('/:id', TeacherController.delete)

export default teacherRouter
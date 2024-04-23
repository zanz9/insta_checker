import {Router} from "express";
import GenderController from "../../packages/gender/GenderController.js";

const genderRouter = Router()

genderRouter.get('/', GenderController.getAll)
genderRouter.get('/:id', GenderController.getById)
genderRouter.post('/', GenderController.create)
genderRouter.put('/', GenderController.update)
genderRouter.delete('/:id', GenderController.delete)


export default genderRouter


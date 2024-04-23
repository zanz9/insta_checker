import {Router} from "express";
import SchoolController from "../../packages/school/SchoolController.js";

const schoolRouter = Router()

schoolRouter.get("/", SchoolController.getAll)
schoolRouter.get("/:id", SchoolController.getById)
schoolRouter.post("/", SchoolController.create)
schoolRouter.put("/", SchoolController.update)
schoolRouter.delete("/:id", SchoolController.delete)

export default schoolRouter
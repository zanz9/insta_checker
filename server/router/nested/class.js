import {Router} from "express";
import ClassController from "../../packages/class/ClassController.js";

const classRouter = Router()

classRouter.get("/", ClassController.getAll)
classRouter.get("/:id", ClassController.getById)
classRouter.post("/", ClassController.create)
classRouter.put("/", ClassController.update)
classRouter.delete("/:id", ClassController.delete)

export default classRouter
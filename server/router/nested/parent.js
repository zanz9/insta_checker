import {Router} from "express";
import ParentController from "../../packages/parent/ParentController.js";
import {body} from "express-validator";

const parentRouter = Router()

parentRouter.get("/", ParentController.getAll)
parentRouter.get("/:id", ParentController.getById)
parentRouter.post("/", [
    body("firstName").isString(),
    body("lastName").isString(),
    body("phone").isString(),
    body("birthday").isISO8601(),
    body("job").isString(),
    body("jobPlace").isString(),
    body("genderId").isInt(),
], ParentController.create)
parentRouter.put("/", ParentController.update)
parentRouter.delete("/:id", ParentController.delete)

export default parentRouter
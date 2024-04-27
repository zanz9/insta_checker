import ParentService from "./ParentService.js";
import ApiError from "../../expcentions/ApiError.js";
import {validationResult} from "express-validator";
import ParentM from "../../models/ParentM.js";
import {logging} from "selenium-webdriver";

class ParentController {
    async getAll(req, res, next) {
        try {
            const parents = await ParentService.getAll()
            return res.json(parents)
        } catch (e) {
            next(e)
        }
    }

    async getById(req, res, next) {
        try {
            const parent = await ParentService.getById(req.params.id)
            return res.json(parent)
        } catch (e) {
            next(e)
        }
    }

    async create(req, res, next) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest("Неправильно переданы параметры"))
            }
            const parentM = new ParentM(req.body)
            const parent = await ParentService.create(parentM)
            return res.json(parent)
        } catch (e) {
            next(e)
        }
    }

    async update(req, res, next) {
        try {
            const parentM = new ParentM(req.body)
            const parent = await ParentService.update(parentM.id, parentM)
            return res.json(parent)
        } catch (e) {
            next(e)
        }
    }

    async delete(req, res, next) {
        try {
            const parent = await ParentService.delete(req.params.id)
            return res.json(parent)
        } catch (e) {
            next(e)
        }
    }
}

export default new ParentController()
import {validationResult} from "express-validator";

import ApiError from "../../expcentions/ApiError.js";

import SchoolBoyService from "./SchoolBoyService.js";
import SchoolBoyM from "../../models/SchoolBoyM.js";


class SchoolBoyController {
    async getAll(req, res, next) {
        try {
            const schoolBoys = await SchoolBoyService.getAll()
            return res.json(schoolBoys)
        } catch (e) {
            next(e)
        }
    }

    async getById(req, res, next) {
        try {
            const schoolBoy = await SchoolBoyService.getById(req.params.id)
            return res.json(schoolBoy)
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
            const schoolBoyM = new SchoolBoyM(req.body)
            const schoolBoy = await SchoolBoyService.create(schoolBoyM)
            return res.json(schoolBoy)
        } catch (e) {
            next(e)
        }
    }

    async update(req, res, next) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest("Неправильно переданы параметры"))
            }
            const schoolBoyM = new SchoolBoyM(req.body)
            const schoolBoy = await SchoolBoyService.update(req.params.id, schoolBoyM)
            return res.json(schoolBoy)
        } catch (e) {
            next(e)
        }
    }

    async delete(req, res, next) {
        try {
            const schoolBoy = await SchoolBoyService.delete(req.params.id)
            return res.json(schoolBoy)
        } catch (e) {
            next(e)
        }
    }
}

export default new SchoolBoyController()
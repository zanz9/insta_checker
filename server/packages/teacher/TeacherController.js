import TeacherService from "./TeacherService.js";
import TeacherM from "../../models/TeacherM.js";
import {validationResult} from "express-validator";
import ApiError from "../../expcentions/ApiError.js";

class TeacherController {

    async getAll(req, res, next) {
        try {
            const teachers = await TeacherService.getAll()
            res.json(teachers)
        } catch (error) {
            next(error)
        }
    }

    async getById(req, res, next) {
        try {
            const teacher = await TeacherService.getById(req.params.id)
            res.json(teacher)
        } catch (error) {
            next(error)
        }
    }

    async create(req, res, next) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest("Неправильно переданы параметры"))
            }
            const teacherM = new TeacherM(req.body)
            const teacher = await TeacherService.create(teacherM)
            res.json(teacher)
        } catch (error) {
            next(error)
        }
    }

    async update(req, res, next) {
        try {
            const teacher = await TeacherService.update(req.params.id, req.body)
            res.json(teacher)
        } catch (error) {
            next(error)
        }
    }

    async delete(req, res, next) {
        try {
            const teacher = await TeacherService.delete(req.params.id)
            res.json(teacher)
        } catch (error) {
            next(error)
        }
    }
}

export default new TeacherController()
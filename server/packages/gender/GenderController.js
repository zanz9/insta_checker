import GenderService from "./GenderService.js";

class GenderController {

    async getAll(req, res, next) {
        try {
            const genders = await GenderService.getAll()
            return res.json(genders)
        } catch (e) {
            next(e)
        }
    }

    async getById(req, res, next) {
        try {
            const gender = await GenderService.getById(req.params.id)
            return res.json(gender)
        } catch (e) {
            next(e)
        }
    }

    async create(req, res, next) {
        try {
            const {name} = req.body
            const gender = await GenderService.create(name)
            return res.json(gender)
        } catch (e) {
            next(e)
        }
    }

    async update(req, res, next) {
        try {
            const {id, name} = req.body
            const gender = await GenderService.update(id, name)
            return res.json(gender)
        } catch (e) {
            next(e)
        }
    }

    async delete(req, res, next) {
        try {
            const gender = await GenderService.delete(req.params.id)
            return res.json(gender)
        } catch (e) {
            next(e)
        }
    }
}


export default new GenderController()
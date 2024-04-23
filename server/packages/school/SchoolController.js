import SchoolService from "./SchoolService.js";

class SchoolController {
    async getAll(req, res, next) {
        try {
            const schools = await SchoolService.getAll()
            return res.json(schools)
        } catch (e) {
            next(e)
        }
    }

    async getById(req, res, next) {
        try {
            const school = await SchoolService.getById(req.params.id)
            return res.json(school)
        } catch (e) {
            next(e)
        }
    }

    async create(req, res, next) {
        try {
            const {name} = req.body
            const school = await SchoolService.create(name)
            return res.json(school)
        } catch (e) {
            next(e)
        }
    }

    async update(req, res, next) {
        try {
            const school = await SchoolService.update(req.body.id, req.body.name)
            return res.json(school)
        } catch (e) {
            next(e)
        }
    }

    async delete(req, res, next) {
        try {
            const school = await SchoolService.delete(req.params.id)
            return res.json(school)
        } catch (e) {
            next(e)
        }
    }

}

export default new SchoolController()
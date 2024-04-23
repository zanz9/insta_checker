import ClassService from "./ClassService.js";

class ClassController {
    async getAll(req, res, next) {
        try {
            const classes = await ClassService.getAll()
            return res.json(classes)
        } catch (e) {
            next(e)
        }
    }

    async getById(req, res, next) {
        try {
            const classes = await ClassService.getById(req.params.id)
            return res.json(classes)
        } catch (e) {
            next(e)
        }
    }

    async create(req, res, next) {
        try {
            const {name} = req.body
            const classes = await ClassService.create(name)
            return res.json(classes)
        } catch (e) {
            next(e)
        }
    }

    async update(req, res, next) {
        try {
            const {id, name} = req.body
            const classes = await ClassService.update(id, name)
            return res.json(classes)
        } catch (e) {
            next(e)
        }
    }

    async delete(req, res, next) {
        try {
            const classes = await ClassService.delete(req.params.id)
            return res.json(classes)
        } catch (e) {
            next(e)
        }
    }
}

export default new ClassController()
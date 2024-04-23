import InstaService from "./InstaService.js";

class InstaController {
    async getImagesByUsername(req, res, next) {
        try {
            const {username} = req.params
            const images = await InstaService.getImagesByUsername(username)
            res.json(images)
        } catch (error) {
            next(error)
        }
    }
}

export default new InstaController()
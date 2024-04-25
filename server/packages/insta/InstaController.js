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

    async getTotalImageCount(req, res, next){
        try {
            const {username} = req.params
            const count = await InstaService.getTotalImageCount(username)
            res.json({count})
        } catch (error) {
            next(error)
        }
    }
}

export default new InstaController()
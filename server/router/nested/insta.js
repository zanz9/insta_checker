import {Router} from "express";
import InstaController from "../../packages/insta/InstaController.js";

const instaRouter = Router()

instaRouter.get('/:username', InstaController.getTotalImageCount)

export default instaRouter


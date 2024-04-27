import {PrismaClient} from "@prisma/client";
import ApiError from "../../expcentions/ApiError.js";
import GenderService from "../gender/GenderService.js";

class ParentService {
    db = new PrismaClient()

    async getAll() {
        return this.db.parent.findMany({
            include: {
                gender: true
            }
        });
    }

    async getById(id) {
        return this.db.parent.findUnique({where: {id: +id}})
    }

    async create(parentM) {
        const gender = await GenderService.getById(parentM.genderId)
        if (!gender) {
            throw ApiError.BadRequest("Пол не найден")
        }
        return this.db.parent.create({data: {...parentM}})
    }

    async update(id, parentM) {
        return this.db.parent.update({where: {id: +id}, data: {...parentM}})
    }

    async delete(id) {
        return this.db.parent.delete({where: {id: +id}})
    }
}

export default new ParentService()
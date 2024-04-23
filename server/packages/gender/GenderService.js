import {PrismaClient} from "@prisma/client";

class GenderService {
    db = new PrismaClient()
    async getAll() {
        return this.db.gender.findMany();
    }

    async getById(id) {
        return this.db.gender.findUnique({where: {id: +id}})
    }

    async create(name) {
        return this.db.gender.create({data: {name}})
    }

    async update(id, name) {
        return this.db.gender.update({where: {id: +id}, data: {name}})
    }

    async delete(id) {
        return this.db.gender.delete({where: {id: +id}})
    }
}

export default new GenderService()
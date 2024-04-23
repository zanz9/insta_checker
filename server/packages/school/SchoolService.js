import {PrismaClient} from "@prisma/client";

class SchoolService {
    db = new PrismaClient()

    async getAll() {
        return this.db.school.findMany()
    }

    async getById(id) {
        return this.db.school.findUnique({where: {id: +id}})
    }

    async create(name) {
        return this.db.school.create({data: {name}})
    }

    async update(id, name) {
        return this.db.school.update({where: {id: +id}, data: {name}})
    }

    async delete(id) {
        return this.db.school.delete({where: {id: +id}})
    }
}

export default new SchoolService()
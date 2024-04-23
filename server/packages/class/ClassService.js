import {PrismaClient} from "@prisma/client";

class ClassService {
    db = new PrismaClient()

    async getAll() {
        return this.db.classTable.findMany()
    }

    async getById(id) {
        return this.db.classTable.findUnique({where: {id: +id}})
    }

    async create(name) {
        return this.db.classTable.create({data: {name}})
    }

    async update(id, name) {
        return this.db.classTable.update({where: {id: +id}, data: {name}})
    }

    async delete(id) {
        return this.db.classTable.delete({where: {id: +id}})
    }
}

export default new ClassService()
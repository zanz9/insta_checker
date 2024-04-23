import {PrismaClient} from "@prisma/client";

class TeacherService {
    db = new PrismaClient()

    async getAll() {
        return this.db.teacher.findMany();
    }

    async getById(id) {
        return this.db.teacher.findUnique({where: {id: +id}});
    }

    async create(teacherM) {
        return this.db.teacher.create({data: {...teacherM}});
    }

    async update(id, data) {
        return this.db.teacher.update({where: {id: +id}, data});
    }

    async delete(id) {
        return this.db.teacher.delete({where: {id: +id}});
    }
}

export default new TeacherService()
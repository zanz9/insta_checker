import {PrismaClient} from "@prisma/client";

class FamilyService {
    db = new PrismaClient()

    async create(schoolBoyId, parentId) {
        return this.db.family.create({data: {schoolBoyId: +schoolBoyId, parentId: +parentId}})
    }

    async update(id, schoolBoyId, parentId) {
        return this.db.family.update({
            where: {id},
            data: {schoolBoyId: +schoolBoyId, parentId: +parentId}
        })
    }

    async delete(schoolBoyId) {
        return this.db.family.deleteMany({
            where: {
                schoolBoyId: +schoolBoyId
            }
        })
    }

}

export default new FamilyService()
import {PrismaClient} from "@prisma/client";
import ApiError from "../../expcentions/ApiError.js";

import FamilyService from "./FamilyService.js";
import ParentService from "../parent/ParentService.js";

class SchoolBoyService {
    db = new PrismaClient()

    async getAll(offset, limit) {
        const total = await this.db.schoolBoy.count()
        const schoolBoys = await this.db.schoolBoy.findMany({
            include: {
                info: {
                    include: {
                        school: true,
                        classes: true,
                        teacher: true
                    }
                },
                gender: true,
            },
            take: limit,
            skip: offset,
            orderBy: {id: 'desc'},
        });

        return {total, schoolBoys}
    }

    async getById(id) {
        return this.db.schoolBoy.findUnique({
            where: {id: +id}, include: {
                family: {
                    include: {
                        parent: {
                            include: {
                                gender: true
                            }
                        }
                    }
                },
                info: {
                    include: {
                        school: true,
                        classes: true,
                        teacher: true
                    }
                },
                gender: true,
            }
        })
    }

    async create(schoolBoy) {
        const {genderId, schoolId, classId, teacherId, parentId} = schoolBoy;

        const schoolBoyData = await this.db.schoolBoy.create({
            data: {
                firstName: schoolBoy.firstName,
                lastName: schoolBoy.lastName,
                birthday: schoolBoy.birthday,
                email: schoolBoy.email,
                phone: schoolBoy.phone,
                instagram: schoolBoy.instagram,
                gender: {
                    connect: {id: +genderId}
                },
                info: {
                    create: {
                        school: {
                            connect: {id: +schoolId}
                        },
                        classes: {
                            connect: {id: +classId}
                        },
                        teacher: {
                            connect: {id: +teacherId}
                        }
                    }
                },
            },
            include: {
                info: true,
                family: true
            }
        });
        if (!schoolBoyData) throw ApiError.BadRequest("Ошибка при создании записи ученика");

        const familyPromises = parentId.map(async (id) => {
            const parent = await this.db.parent.findUnique({where: {id: +id}});
            if (parent) {
                return await FamilyService.create(schoolBoyData.id, id);
            }
        });
        const family = await Promise.all(familyPromises);
        return {...schoolBoyData, family}
    }

    async update(id, schoolBoy) {
        const {genderId, schoolId, classId, teacherId, parentId} = schoolBoy;

        const schoolBoyData = await this.db.schoolBoy.update({
            where: {id: +id},
            data: {
                firstName: schoolBoy.firstName,
                lastName: schoolBoy.lastName,
                birthday: schoolBoy.birthday,
                email: schoolBoy.email,
                phone: schoolBoy.phone,
                instagram: schoolBoy.instagram,
                gender: {
                    connect: {id: +genderId}
                },
                info: {
                    update: {
                        school: {
                            connect: {id: +schoolId}
                        },
                        classes: {
                            connect: {id: +classId}
                        },
                        teacher: {
                            connect: {id: +teacherId}
                        }
                    }
                },
            },
        });
        if (!schoolBoyData) throw ApiError.BadRequest("Ошибка при обновлении записи ученика");

        await FamilyService.delete(schoolBoyData.id)
        const familyPromises = parentId.map(async (id) => {
            const parent = await ParentService.getById(id);
            if (parent) {
                return await FamilyService.create(schoolBoyData.id, id);
            }
        });
        const family = await Promise.all(familyPromises);
        return {...schoolBoyData, family}
    }

    async delete(id) {
        await FamilyService.delete(id)
        return this.db.schoolBoy.delete({where: {id: +id}})
    }
}

export default new SchoolBoyService()
import {PrismaClient} from "@prisma/client";

class InfoService {
    db = new PrismaClient()
}

export default new InfoService()
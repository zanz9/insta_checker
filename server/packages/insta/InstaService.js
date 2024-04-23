import InstaApi from "./InstaApi.js";

class InstaService {

    async getImagesByUsername(username) {
        const sessionid = await InstaApi.login(process.env.IG_USERNAME, process.env.IG_PASSWORD)
        const {pk} = await InstaApi.userInfo(sessionid, username)
        const medias = await InstaApi.userMedias(sessionid, pk)
        return medias
    }
}

export default new InstaService()
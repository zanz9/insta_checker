import axios from "axios";
import * as fs from "fs";

const instaApi = axios.create({
    baseURL: "http://localhost:8000",
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
    }
})

class InstaApi {
    saveSessionId(sessionId) {
        fs.writeFileSync('sessionId.txt', sessionId)
    }

    readSessionId() {
        return fs.readFileSync('sessionId.txt', 'utf8')
    }

    async login(username, password) {
        let sessionId;
        if (fs.existsSync('sessionId.txt')) {
            const sessionIdFile = this.readSessionId()
            const {data} = await instaApi.post("/auth/login_by_sessionid", {
                sessionid: sessionIdFile
            })
            sessionId = data
        } else {
            const {data} = await instaApi.post("/auth/login", {
                username,
                password,
                verification_code: "",
                proxy: "",
                locale: 'ru',
                timezone: "",
            },)
            sessionId = data
        }
        this.saveSessionId(sessionId)
        return sessionId
    }


    async userInfo(sessionid, username) {
        const {data} = await instaApi.post("/user/info_by_username", {
            sessionid, username, use_cache: true
        })
        console.log(data)
        return data
    }

    async userMedias(sessionid, userId) {
        const {data} = await instaApi.post("/media/user_medias", {
            sessionid, user_id: userId, amount: 10
        })
        return data

    }
}

export default new InstaApi()
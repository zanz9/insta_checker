export default class TeacherM {
    id
    firstName
    lastName
    phone

    constructor(body) {
        this.id = body.id
        this.firstName = body.firstName
        this.lastName = body.lastName
        this.phone = body.phone
    }
}
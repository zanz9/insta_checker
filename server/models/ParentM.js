export default class ParentM {
    id
    firstName
    lastName
    phone
    birthday
    job
    jobPlace
    genderId

    constructor(body) {
        this.id = body.id
        this.firstName = body.firstName
        this.lastName = body.lastName
        this.phone = body.phone
        this.birthday = body.birthday
        this.job = body.job
        this.jobPlace = body.jobPlace
        this.genderId = +body.genderId
    }
}
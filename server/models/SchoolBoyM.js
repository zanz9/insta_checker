export default class SchoolBoyM {
    id
    firstName
    lastName
    birthday
    email
    phone
    instagram
    genderId
    schoolId
    classId
    teacherId
    parentId


    constructor(body) {
        this.id = body.id
        this.firstName = body.firstName
        this.lastName = body.lastName
        this.birthday = body.birthday
        this.email = body.email
        this.phone = body.phone
        this.instagram = body.instagram
        this.genderId = body.genderId
        this.schoolId = body.schoolId
        this.classId = body.classId
        this.teacherId = body.teacherId
        this.parentId = body.parentId
    }
}


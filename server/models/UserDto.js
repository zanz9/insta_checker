export default class UserDto {
    id
    email

    constructor(user) {
        this.id = user.id
        this.email = user.email
    }
}

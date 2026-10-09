export class SignInResource {
    constructor({id, username, name, email, role, token}) {
        this.id = id;
        this.username = username;
        this.name = name;
        this.email = email;
        this.role = role;
        this.token = token;
    }
}

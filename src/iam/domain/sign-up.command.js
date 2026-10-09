export class SignUpCommand {
    constructor({name, email, password, role}) {
        this.username = email;
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
    }
}

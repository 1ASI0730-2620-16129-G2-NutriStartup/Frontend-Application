export class User {
    constructor({id, username, name, email, role}) {
        this.id = id;
        this.username = username;
        this.name = name || username;
        this.email = email || null;
        this.role = role || null;
    }
}

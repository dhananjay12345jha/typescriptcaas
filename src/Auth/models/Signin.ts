import * as randomstring from "randomstring";

export class Signin {
    private username:string;
    private password:string;
    // private email:string;

    constructor(username: string = `auto${randomstring.generate(8)}@mailnator.com`, password: string = "pa55word") {
        this.username = username;
        this.password = password;
        // this.email = username;
    }
 }
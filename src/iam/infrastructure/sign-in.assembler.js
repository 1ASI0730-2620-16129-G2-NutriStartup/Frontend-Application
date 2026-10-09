import {SignInResource} from "@/iam/infrastructure/sign-in.resource.js";

export class SignInAssembler {

    static toResourceFromResponse(response) {
        if (response.status < 200 || response.status >= 300) {
            console.error(`Error: ${response.status} - ${response.statusText}`);
            return null;
        }
        return new SignInResource(response.data);
    }

}

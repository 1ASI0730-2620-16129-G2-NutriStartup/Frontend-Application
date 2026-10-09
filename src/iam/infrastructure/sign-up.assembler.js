import {SignUpResource} from "@/iam/infrastructure/sign-up.resource.js";

export class SignUpAssembler {
    static toResourceFromResponse(response) {
        if (response.status < 200 || response.status >= 300) {
            console.error(`Error: ${response.status} - ${response.statusText}`);
            return null;
        }
        return new SignUpResource(response.data);
    }
}

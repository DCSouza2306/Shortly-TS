import { ApplicationError } from "../protocols";

export function invalideCredentialsError(): ApplicationError{
    return {
        name: "InvalidCredentialsError",
        message: "email or password are incorrect"
    }
}
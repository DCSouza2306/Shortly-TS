import { ApplicationError } from "../protocols";

export function duplicatedEmail(): ApplicationError{
    return {
        name: "DuplicatedEmailError",
        message: "There is already an user registred with given email"
    }
}
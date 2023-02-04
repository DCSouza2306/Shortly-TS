import { ApplicationError } from "../protocols";

export function invalidDataError(details: string[]): ApplicationInvalidDataError{
    return {
        name: "InvalidDataError",
        message: "Invalid Data",
        details,
    }
}

type ApplicationInvalidDataError = ApplicationError & {
    details: string[]
}
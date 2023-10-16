import { EStatuses } from "../enums/EStatuses";

export default interface IResponse<T = undefined> {
    result: T | undefined | null
    message: string
    status: EStatuses
}
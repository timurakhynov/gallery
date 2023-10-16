import IUser from "./IUser";

export default interface IUserGetDto {
    _id: IUser['_id']
    username: IUser['username']
    token: IUser['token']
}
import IUser from "./IUser";

export default interface IUserCreateDto {
    username: IUser['username']
    password: IUser['password']
}
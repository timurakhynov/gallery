import IUser from "./IUser"

export default interface IPhoto {
    _id: string
    title: string
    user_id: IUser
    image: File | undefined | string
}
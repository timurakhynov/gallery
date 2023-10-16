import { Document, ObjectId } from "mongoose"
import IUser from "./IUser"

export default interface IPhoto extends Document {
    _id: ObjectId
    title: string
    user_id: IUser
    image: File | string
}
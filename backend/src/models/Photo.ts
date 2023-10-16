import mongoose, { Schema } from "mongoose";
import IPhoto from "../interfaces/IPhoto";

const PhotoSchema: Schema = new Schema<IPhoto>({
    title: {
        type: String,
        required: true
    }, 
    image: {
        type: String,
        required: true
    },
    user_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, {
    versionKey: false
}
)

export const Photo = mongoose.model<IPhoto>('Photo', PhotoSchema)
import IPhoto from "../../interfaces/IPhoto"

export default interface IPhotosState {
    photos: IPhoto[]
    userName: string
    loadingPhotos: boolean
    messagePhoto: string
}
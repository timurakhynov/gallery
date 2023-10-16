import IPhoto from "./IPhoto";

export default interface IPhotoDto {
    title: IPhoto['title']
    user_id: IPhoto['user_id']
    image: IPhoto['image']
}
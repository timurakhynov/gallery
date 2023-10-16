import IResponse from "../interfaces/IResponse"
import IPhoto from "../interfaces/IPhoto"
import IPhotoDto from "../interfaces/IPhotoDto"
import { mongo, Mongo } from "../repository/mongo"

export class PhotoService {
    private repository: Mongo
    constructor() {
        this.repository = mongo
    }
    public getPhotos = async (id?: string): Promise<IResponse<IPhoto[] | undefined>> => {
        return await this.repository.getPhotos(id)
    }
    
    public getPhotoById = async (id: string): Promise<IResponse<IPhoto | undefined>> => {
        return await this.repository.getPhotoById(id)
    };

    public addPhoto = async (userId: string, photoDto: IPhotoDto): Promise<IResponse<IPhoto | undefined>> => {
        return await this.repository.addPhoto(userId, photoDto)
    }

    public deletePhotoById = async (userId: string, photoId: string): Promise<IResponse<IPhoto | undefined>> => {
        return await this.repository.deletePhotoById(userId, photoId)
    };   
}

export const photoService = new PhotoService()
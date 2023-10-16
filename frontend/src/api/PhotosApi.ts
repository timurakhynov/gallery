import { EStatuses } from "../enums/EStatuses"
import IPhoto from "../interfaces/IPhoto"
import IResponse from "../interfaces/IResponse"
import { instance } from "./instance"


class PhotoApi {

    public getPhotos = async(id?: string): Promise<IResponse<IPhoto[] | undefined>> => {
        try {
            const response = await instance.get(id ? `/photos?user=${id}` : '/photos')
            return response.data
        } catch (err: unknown) {
            const error = err as Error
            const response: IResponse = {
                status: EStatuses.NOT_OK,
                result: undefined,
                message: error.message
            }
            return response
        }
    }

    public getPhotoById = async(id: string): Promise<IResponse<IPhoto | undefined>> => {
        try {
            const response = await instance.get(`/photos/${id}`)
            return response.data
        } catch (err: unknown) {
            const error = err as Error
            const response: IResponse = {
                status: EStatuses.NOT_OK,
                result: undefined,
                message: error.message
            }
            return response
        }
    }

    public addPhoto = async (photo: FormData): Promise<IResponse<IPhoto | undefined>> => {
        try {
            const response = await instance.post('/photos', photo);
            return response.data;
        } catch (err: unknown) {
            const error = err as Error;
            const response = {
                status: EStatuses.NOT_OK,
                result: undefined,
                message: error.message
            };
            return response;
        };
    };

    public deletePhotoById = async (id: string): Promise<IResponse<IPhoto | undefined>> => {
        try {
            const response = await instance.delete(`/photos/${id}`);
            return response.data;
        } catch (err: unknown) {
            const error = err as Error;
            const response: IResponse<undefined> = {
                status: EStatuses.NOT_OK,
                result: undefined,
                message: error.message
            }
            return response
        }
    }
}

export const photoApi = new PhotoApi()
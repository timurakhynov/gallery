import { createSlice } from "@reduxjs/toolkit"
import { createAppAsyncThunk } from "../createAppAsyncThunk"
import { photoApi } from "../../api/PhotosApi"
import IPhoto from "../../interfaces/IPhoto"
import IPhotosState from "./IPhotosState"
import { userApi } from "../../api/UserApi"


const namespace = 'photos'

export const getPhotos = createAppAsyncThunk(
    `${namespace}/getPhotos`,
    async (id?: string) => {
        return photoApi.getPhotos(id)
    }
)

export const getUserName = createAppAsyncThunk(
    `${namespace}/getUserName`,
    async (id: string) => {
        return userApi.getUserById(id)
    }
)

export const deletePhotoById = createAppAsyncThunk(
    `${namespace}/deletePhotoById`,
    async (id: string) => {
        return photoApi.deletePhotoById(id)
    }
)

export const addPhoto = createAppAsyncThunk(
    `${namespace}/addPhoto`,
    async (photo: FormData) => {
        return photoApi.addPhoto(photo)
    }
);

const initialState: IPhotosState = {
    photos: [],
    userName: '',
    loadingPhotos: false,
    messagePhoto: ''
}

export const photosSlice = createSlice({
    name: namespace,
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getPhotos.rejected, (state) => {
                state.loadingPhotos = false
            })
            .addCase(getPhotos.pending, (state) => {
                state.loadingPhotos = true
            })
            .addCase(getPhotos.fulfilled, (state, action) => {
                state.loadingPhotos = false
                state.photos = action.payload.result as IPhoto[] || []
                state.messagePhoto = action.payload.message
            })

            .addCase(getUserName.rejected, (state) => {
                state.loadingPhotos = false
            })
            .addCase(getUserName.pending, (state) => {
                state.loadingPhotos = true
            })
            .addCase(getUserName.fulfilled, (state, action) => {
                state.loadingPhotos = false
                state.userName = action.payload.result?.username || ''
                state.messagePhoto = action.payload.message
            })

            .addCase(deletePhotoById.rejected, (state) => {
                state.loadingPhotos = false
            })
            .addCase(deletePhotoById.pending, (state) => {
                state.loadingPhotos = true
            })
            .addCase(deletePhotoById.fulfilled, (state, action) => {
                state.loadingPhotos = false
                if (action.payload.status !== 0) {
                    const array = state.photos.filter((p) => p._id !== action.payload.result?._id);
                    state.photos = array;
                };
                state.messagePhoto = action.payload.message
            })

            .addCase(addPhoto.rejected, (state) => {
                state.loadingPhotos = false
            })
            .addCase(addPhoto.pending, (state) => {
                state.loadingPhotos = true
            })
            .addCase(addPhoto.fulfilled, (state, action) => {
                state.loadingPhotos = false
                state.messagePhoto = action.payload.message
            })
    }
})
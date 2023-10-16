import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import { useDispatch } from 'react-redux'
import { usersSlice } from "./users/users.slice"
import { photosSlice } from "./photos/photos.slice"

const makeStore = () => {
    return configureStore({
        reducer: {
            photos: photosSlice.reducer,
            users: usersSlice.reducer
        }
    })
}

const store = makeStore()
export type AppDispatch = typeof store.dispatch;
export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    AppState,
    unknown,
    Action
>;

export const useAppDispatch: () => AppDispatch = useDispatch;

export default store
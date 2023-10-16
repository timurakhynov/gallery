import { createSlice } from "@reduxjs/toolkit";
import { userApi } from "../../api/UserApi";
import IUser from "../../interfaces/IUser";
import IUserCreateDto from "../../interfaces/IUserCreateDto";
import { createAppAsyncThunk } from "../createAppAsyncThunk";
import IUsersState from "./IUsersState";

const namespace = 'users'


export const login = createAppAsyncThunk(
    `${namespace}/login`,
    async (user: IUserCreateDto) => {
        return userApi.login(user)
    }
)

export const register = createAppAsyncThunk(
    `${namespace}/register`,
    async (user: IUserCreateDto) => {
        return userApi.register(user)
    }
)

export const checkToken = createAppAsyncThunk(
    `${namespace}/checkToken`,
    async () => {
        return userApi.checkToken()
    }
)


const initialState: IUsersState = {
    user: {} as IUser,
    isAuth: false,
    loadingUser: false,
    showError: false,
    errorMessage: '',
    loginShowError: false,
    loginErrorMessage: '',
    registerShowError: false,
    registerErrorMessage: ''
}


export const usersSlice = createSlice({
    name: namespace,
    initialState: initialState,
    reducers: {
        initState(state) {
            state = initialState
        },
        clearError(state) {
            state.errorMessage = ''
            state.showError = false
            state.loginShowError = false
            state.loginErrorMessage = ''
            state.registerShowError = false
            state.registerErrorMessage = ''
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.rejected, (state) => {
                state.loadingUser = false
            })
            .addCase(login.pending, (state) => {
                state.loadingUser = true
            })
            .addCase(login.fulfilled, (state, action) => {
                if (action.payload.status === 1) {
                    state.loadingUser = false
                    const user = action.payload.result
                    state.user = user
                    state.loginShowError = false
                    state.loginErrorMessage = ''
                    if (user) {
                        localStorage.setItem('token', user.token)
                        state.isAuth = true
                    }
                } else {
                    state.loginShowError = true
                    state.loginErrorMessage = action.payload.message
                }
            })
            .addCase(register.rejected, (state) => {
                state.loadingUser = false
                state.registerShowError = true
                state.registerErrorMessage = 'Connection error'
            })
            .addCase(register.pending, (state) => {
                state.loadingUser = true
            })
            .addCase(register.fulfilled, (state, action) => {
                if (action.payload.status === 1) {
                    state.loadingUser = false
                    const user = action.payload.result
                    state.user = user
                    state.registerShowError = false
                    state.registerErrorMessage = ''
                    if (user) {
                        localStorage.setItem('token', user.token)
                        state.isAuth = true
                    }
                } else {
                    state.registerShowError = true
                    state.registerErrorMessage = action.payload.message
                }
            })
            .addCase(checkToken.rejected, (state) => {
                state.loadingUser = false;
                state.showError = true;
                state.errorMessage = 'Connection error';
            })
            .addCase(checkToken.pending, (state) => {
                state.loadingUser = true
            })
            .addCase(checkToken.fulfilled, (state, action) => {
                if (action.payload.status === 1) {
                    state.loadingUser = false
                    const user = action.payload.result
                    state.user = user
                    if (user) {
                        state.isAuth = true
                    } else {
                        state.isAuth = false
                    }
                } else {
                    state.showError = true
                    state.errorMessage = action.payload.message
                }
            })
    }
})

export const {initState, clearError} = usersSlice.actions
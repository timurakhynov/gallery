import IUserGetDto from "../../interfaces/IUserGetDto"

export default interface IUsersState {
    user: IUserGetDto | undefined | null
    isAuth: boolean
    loadingUser: boolean
    showError: boolean
    errorMessage: string
    loginShowError: boolean
    loginErrorMessage: string
    registerShowError: boolean
    registerErrorMessage: string
}
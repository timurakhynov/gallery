import IResponse from "../interfaces/IResponse";
import IUser from "../interfaces/IUser";
import IUserCreateDto from "../interfaces/IUserCreateDto";
import IUserGetDto from "../interfaces/IUserGetDto";
import { mongo, Mongo } from "../repository/mongo";


export class UserService {
    private repository: Mongo
    constructor() {
        this.repository = mongo
    }

    public createUser = async (userDto: IUserCreateDto): Promise<IResponse<IUserGetDto | undefined>> => {
        return await this.repository.createUser(userDto)
    }

    public getUserById = async (id: string): Promise<IResponse<IUser | undefined>> => {
        return await this.repository.getUserById(id)
     }

    public login = async (userDto: IUserCreateDto): Promise<IResponse<IUserGetDto | undefined>> => {
        return await this.repository.login(userDto)
    }
}

export const userService = new UserService()
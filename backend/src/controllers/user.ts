import express, { Request, Response, Router } from "express";
import { EStatuses } from "../enums/EStatuses";
import IRequestWithTokenData from "../interfaces/IRequestWithTokenData";
import IUserGetDto from "../interfaces/IUserGetDto";
import { auth } from "../middlewares/auth";
import { userService, UserService } from "../services/user";


export class UserController {
    private service: UserService
    private router: Router
    constructor() {
        this.service = userService
        this.router = express.Router()
        this.router.get('/', this.getUserById)
        this.router.post('/', this.createUser)
        this.router.post('/login', this.login)
        this.router.get('/token', auth, this.checkToken)
    }

    public getRouter = (): Router => {
        return this.router
    }

    private createUser = async (req: Request, res: Response) => {
        const response = await this.service.createUser(req.body)
        res.status(200).send(response)
    }

    public login = async (req: Request, res: Response) => {
        const response = await this.service.login(req.body)
        res.status(200).send(response)
    }

    public getUserById = async (req: Request, res: Response) => {
        const response = await this.service.getUserById(req.query?.id as string);
        res.status(200).send(response)
    }

    public checkToken = async (expressReq: Request, res: Response): Promise<void> => {
        const req = expressReq as IRequestWithTokenData
        const response = {
            status: EStatuses.OK,
            result: req.dataFromToken as IUserGetDto,
            message: 'Token is ok'
        }
        res.status(200).send(response)
    }
}

export const userController = new UserController()
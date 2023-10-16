import express, { Router, Request, Response } from 'express'


export class HealthCheckController {
    private router: Router

    constructor() {
        this.router = express.Router()
        this.router.get('/', this.checkHealth)
    }

    public getRouter = (): Router => {
        return this.router
    }
    
    private checkHealth = (req: Request, res: Response): void => {
        res.send('Server is OK')
    }
}
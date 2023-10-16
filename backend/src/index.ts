import express, { Express } from 'express'
import { HealthCheckController } from './controllers/healthCheck'
import dotenv from 'dotenv'
import cors from 'cors'
import { PhotosController } from './controllers/photo'
import { UserController } from './controllers/user'
import { mongo } from './repository/mongo'
dotenv.config()

class App {
    private app: Express
    constructor() {
        this.app = express()
        this.app.use(express.json())
        this.app.use(express.static('public'))
        this.app.use(cors())
    }

    public init = async (): Promise<void> => {
        try {
            await mongo.init()
            process.on('exit', () => {
                mongo.close()
            })
            this.app.use('/health-check', new HealthCheckController().getRouter())
            this.app.use('/photos', new PhotosController().getRouter())
            this.app.use('/users', new UserController().getRouter())

            this.app.listen(process.env.APP_PORT, () => {
                console.log(`Server is running on port ${process.env.APP_PORT}`)
            })
        } catch(err) {
            console.log(err)
        }
    }

}


const app = new App()
app.init()
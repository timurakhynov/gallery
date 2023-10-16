import express, { Router, Request, Response } from 'express'
import { PhotoService, photoService } from '../services/photos'
import { auth } from '../middlewares/auth'
import IRequestWithTokenData from '../interfaces/IRequestWithTokenData'
import IUserGetDto from '../interfaces/IUserGetDto'
import multer from 'multer'
import shortid from 'shortid'
import { config } from '../index.config'

const storage = multer.diskStorage({
    destination(req, file, callback) {
        callback(null, config.filePath)
    },
    filename(req, file, callback) {
        callback(null,
            `${shortid()}${file.originalname}`)
    },
});
const upload = multer({ storage });

export class PhotosController {
    private router: Router
    private service: PhotoService

    constructor() {
        this.router = express.Router()
        this.router.get('/', this.getPhotos)
        this.router.get('/', this.getPhotoById)
        this.router.post('/', [auth, upload.single('image')], this.addPhoto)
        this.router.delete('/:id', auth, this.deletePhotoById)
        this.service = photoService
    }

    public getRouter = (): Router => {
        return this.router
    }

    private getPhotos = async (req: Request, res: Response): Promise<void> => {
        const response = await this.service.getPhotos(req.query?.user as string);
        res.send(response);
    };

    private getPhotoById = async (req: Request, res: Response): Promise<void> => {
        const response = await this.service.getPhotoById(req.params.id);
        res.send(response);
    };

    private addPhoto = async (expressReq: Request, res: Response): Promise<void> => {
        const req = expressReq as IRequestWithTokenData
        const user = req.dataFromToken as IUserGetDto
        const photo = req.body;
        photo.image = req.file?.filename;
        const response = await this.service.addPhoto(user._id, photo);
        res.send(response);
    };
    
    private deletePhotoById = async (expressReq: Request, res: Response): Promise<void> => {
        const req = expressReq as IRequestWithTokenData
        const user = req.dataFromToken as IUserGetDto
        const response = await this.service.deletePhotoById(user._id, req.params.id);
        res.send(response);
    };
}
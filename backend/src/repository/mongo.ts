import mongoose, { Mongoose } from 'mongoose'
import dotenv from 'dotenv'
import IDataBase from '../interfaces/IDataBase'
import IResponse from '../interfaces/IResponse'
import { EStatuses } from '../enums/EStatuses'
import IUser from '../interfaces/IUser'
import { User } from '../models/User'
import IUserGetDto from '../interfaces/IUserGetDto'
import IUserCreateDto from '../interfaces/IUserCreateDto'
import { generateJWT } from '../helpers/generateJWT'
import IPhoto from '../interfaces/IPhoto'
import { Photo } from '../models/Photo'
import IPhotoDto from '../interfaces/IPhotoDto'
dotenv.config()

export class Mongo implements IDataBase {
   private client: Mongoose | null = null

   public close = async(): Promise<void> => {
        if (!this.client) return
        await this.client.disconnect()
   }

   public init = async (): Promise<void> => {
     this.client = await mongoose.connect(process.env.MONGO_CLIENT_URL || '')
    console.log('MongoDB is connected')
   }

      // photo

      public getPhotos = async (id?: string): Promise<IResponse<IPhoto[] | undefined>> => {
         try {
            if (!id) {
               const data = await Photo.find().populate('user_id', 'username')
               const response = {
                   status: EStatuses.OK,
                   result: data,
                   message: ''
               };
               return response;
            } else {
               const data = await Photo.find({ user_id: id }).populate('user_id', 'username')
               const response = {
                   status: EStatuses.OK,
                   result: data,
                   message: ''
               }
               return response
            }
         } catch (err: unknown) {
             const error = err as Error
             const response = {
                 status: EStatuses.NOT_OK,
                 result: undefined,
                 message: error.message
             };
             return response;
         };
     };
   
     public getPhotoById = async (id: string): Promise<IResponse<IPhoto | undefined>> => {
         try {
             if (!id.match(/^[0-9a-fA-F]{24}$/)) throw new Error('Id is not valid!');
             const foundPhoto = await Photo.findById(id).populate('user_id');
             if (!foundPhoto) throw new Error('This Photo is not found.');
             const response = {
                 status: EStatuses.OK,
                 result: foundPhoto,
                 message: ''
             };
             return response;
         } catch (err: unknown) {
             const error = err as Error
             const response = {
                 status: EStatuses.NOT_OK,
                 result: undefined,
                 message: error.message
             };
             return response;
         };
     };
   
     public addPhoto = async (userId: string, photoDto: IPhotoDto): Promise<IResponse<IPhoto | undefined>> => {
         try {
            const foundUser = await User.findById(userId);
            if (!foundUser) throw new Error('Unauthorized!');
            if (photoDto.title === undefined || photoDto.title.trim() === '') { 
               throw new Error('Photo title is required!')
            }
            if (photoDto.image === '') throw new Error('Photo image is required!');
             const newPhoto = new Photo({ ...photoDto, user_id: userId });
             const data = await newPhoto.save();
             const response = {
                 status: EStatuses.OK,
                 result: data,
                 message: ''
             };
             return response;
         } catch (err: unknown) {
             const error = err as Error
             const response = {
                 status: EStatuses.NOT_OK,
                 result: undefined,
                 message: error.message
             };
             return response;
         };
     };
   
     public deletePhotoById = async (userId: string, photoId: string): Promise<IResponse<IPhoto | undefined>> => {
         try {
             const foundUser = await User.findById(userId);
             if (!foundUser) throw new Error('Unauthorized!');
             if (!photoId.match(/^[0-9a-fA-F]{24}$/)) throw new Error('Photo id is not valid!');
             const foundPhoto = await Photo.findById(photoId);
             if (!foundPhoto) throw new Error('This Photo is not found.');
             if (String(foundUser?._id) !== String(foundPhoto.user_id)) throw new Error('You have no permission to delete it!');
             const data = await Photo.findOneAndDelete({ _id: photoId }).populate('user_id', 'username');
             const response = {
                 status: EStatuses.OK,
                 result: data || undefined,
                 message: ''
             };
             return response;
         } catch (err: unknown) {
             const error = err as Error
             const response = {
                 status: EStatuses.NOT_OK,
                 result: undefined,
                 message: error.message
             };
             return response;
         };
     }; 

   //Users create

   public createUser = async (userDto: IUserCreateDto): Promise<IResponse<IUserGetDto | undefined>> => {
      try {
         const exists = await User.exists({username: userDto.username})
         if (exists) {
            return {
               status: EStatuses.NOT_OK,
               result: undefined,
               message: '[ERROR] User already registered'
            }
         }
          const user = new User(userDto)
          await user.save()
          const data = {
            _id: user._id,
            username: user.username, 
            token: generateJWT({_id: user._id, username: user.username}, '2h')
          }
          return {
             status: EStatuses.OK,
             result: data,
             message: 'User was created'
          }
       } catch(err: unknown) {
          return {
             status: EStatuses.NOT_OK,
             result: undefined,
             message: '[ERROR] Cannot create user'
          }
       }
   }

   public getUserById = async (id: string): Promise<IResponse<IUser | undefined>> => {
      try {
         const data = await User.findById(id)
         return {
         status: EStatuses.OK,
         result: data,
         message: 'User by id' 
         }
      } catch (err: unknown) {
         return {
         status: EStatuses.NOT_OK,
         result: undefined,
         message: '[ERROR] Cannot get user by id'
         }
      }
   }

   public login = async (userDto: IUserCreateDto): Promise<IResponse<IUserGetDto | undefined>> => {
      try {
         const user = await User.findOne({username: userDto.username})
         if (!user) {
            throw new Error('Not fount')
         }
         const isMatch: boolean = await user.checkPassword(userDto.password)

         if (!isMatch) {
            throw new Error('Wrong password')
         }
         const data = {
            _id: user._id,
            username: user.username, 
            token: generateJWT({_id: user._id, username: user.username}, '2h')
          }
          await user.save()
          return {
             status: EStatuses.OK,
             result: data,
             message: 'Access granted'
          }
      } catch (err: unknown) {
         return {
            status: EStatuses.NOT_OK,
            result: undefined,
            message: '[ERROR] Access denied'
         }
      }
   }
}

export const mongo = new Mongo()
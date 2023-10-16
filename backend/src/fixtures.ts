import mongoose from "mongoose";
import dotenv from "dotenv";
import { User } from "./models/User";
import { Photo } from "./models/Photo";
dotenv.config()

mongoose.connect(process.env.MONGO_CLIENT_URL || '')

const db = mongoose.connection

db.once('open', async () => {
    try {
        await db.dropCollection('users')
        await db.dropCollection('photos')
    } catch (err) {
        console.log(err)
    }

    const [tim, john] = await User.create({
        username: 'Tim',
        password: '123'
    }, {
        username: 'John',
        password: '123'
    })

    await Photo.create({
        title: 'Sunset',
        user_id: tim._id,
        image: '1.jpeg'
    }, {
        title: 'Fog in the forest',
        user_id: tim._id,
        image: '2.jpeg'
    }, {
        title: 'Waterfall',
        user_id: tim._id,
        image: '3.jpeg'
    }, {
        title: 'Mountain Lake',
        user_id: john._id,
        image: '4.jpeg'
    }, {
        title: 'Wave',
        user_id: john._id,
        image: '5.jpeg'
    })

    db.close()
})
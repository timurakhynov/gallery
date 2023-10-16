import React, { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from "react-redux"
import styles from './UserPhotos.module.css'
import { AppDispatch, AppState } from "../../store/store"
import { getPhotos, getUserName } from "../../store/photos/photos.slice"
import UserPhoto from "./UserPhoto/UserPhoto"
import { useNavigate, useSearchParams } from "react-router-dom"
import Button from "../UI/Button/Button"


const UserPhotos: React.FunctionComponent = (): React.ReactElement => {
    const dispatch: AppDispatch = useDispatch()
    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams();
    const user_id = searchParams.get('user')
    const {photos, userName} = useSelector((state: AppState) => state.photos, shallowEqual)
    const {isAuth, user} = useSelector((state: AppState) => state.users, shallowEqual)
    
    useEffect(() => {
        if(user_id){
            dispatch(getPhotos(user_id))
            dispatch(getUserName(user_id))
        } else {
            navigate('/')
        }
    }, [])

    const addNewPhoto = () => {
        navigate({pathname: `/add-photo`, search: `user=${user_id}`})
    }

    return (
        <div className={styles.UserPhotos__container}>
            <div className={styles.UserPhotos__title_button}>
                <h1 className={styles.UserPhotos__title}>{userName}'s gallery</h1>
                {isAuth && user?._id === user_id ?
                    <Button click={addNewPhoto} label="Add new photo"/>
                :
                null
            }
            </div>
            
            <div className={styles.UserPhotos}>
                {photos?.length ? 
                    photos.map((el) => {
                        return <UserPhoto
                        key={el._id}
                        photo={el}
                        />
                    }):<h1>Photo not found</h1>}
            </div>
        </div>
    )
}

export default UserPhotos
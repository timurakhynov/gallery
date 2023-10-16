import React, { MouseEvent, useState } from 'react'
import {  useSearchParams } from 'react-router-dom';
import styles from './UserPhoto.module.css';
import defaultImg from '../../../assets/img/default.png';
import IUserPhotoProps from './IUserPhotoProps';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { AppDispatch, AppState } from '../../../store/store';
import { deletePhotoById, getPhotos } from '../../../store/photos/photos.slice';
import Modal from '../../UI/Modal/Modal';

const UserPhoto: React.FunctionComponent<IUserPhotoProps> = (props): React.ReactElement => {
    const dispatch: AppDispatch = useDispatch()
    const [searchParams, setSearchParams] = useSearchParams();
    const user_id = searchParams.get('user')
    const {isAuth, user} = useSelector((state: AppState) => state.users, shallowEqual)
    const [show, setShow] = useState(false)

    const imageCancelHandler = () => {
    setShow(false)
    }

    const imageHandler = (e: MouseEvent<HTMLDivElement>): void => {
        e.stopPropagation();
        setShow(true)
    }

    const deletePhoto = (e: MouseEvent<HTMLButtonElement>): void => {
        e.stopPropagation();
        const deleteAsk = confirm(`Do you want to delete "${props.photo.title}" photo?`) 
        if (deleteAsk) {
            dispatch(deletePhotoById(props.photo._id))
            if(user_id){
                dispatch(getPhotos(user_id))
            }
        }
    }

    return (
        <>
            <Modal
                show={show}
                closed={imageCancelHandler}
                image={`${import.meta.env.VITE_BASE_URL}uploads/${props.photo.image}`}
                title={props.photo.title}
            />
            <div className={styles.UserPhoto} onClick={imageHandler}>
            <div className={styles.UserPhoto__imageFrame}>
                <img 
                    className={styles.UserPhoto__image}
                    src={`${import.meta.env.VITE_BASE_URL}uploads/${props.photo.image}`} 
                    alt={props.photo.title}
                    onError={(e) => {
                        e.currentTarget.src = defaultImg
                    }} 
                />
            </div>
            <h3>
                {props.photo.title}
            </h3>
            {isAuth && user?._id === props.photo.user_id._id ?
                <button className={styles.UserPhoto__delete} onClick={deletePhoto}>&times;</button>
                :
                null
            }
        </div>
        </>
    )
}
export default UserPhoto
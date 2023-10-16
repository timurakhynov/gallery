import { MouseEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styles from './PhotoItem.module.css';
import defaultImg from '../../../assets/img/default.png';
import IPhotoItemProps from './IPhotoItemProps';
import React from 'react';
import { AppDispatch } from '../../../store/store';
import { useDispatch } from 'react-redux';
import { getUserName } from '../../../store/photos/photos.slice';
import Modal from '../../UI/Modal/Modal';

const PhotoItem: React.FunctionComponent<IPhotoItemProps> = (props): React.ReactElement => {
    const navigate = useNavigate()
    const dispatch: AppDispatch = useDispatch()
    const [show, setShow] = useState(false)

    const imageCancelHandler = () => {
    setShow(false)
    }

    const imageHandler = (e: MouseEvent<HTMLDivElement>): void => {
        e.stopPropagation();
        setShow(true)
    }

    const userPhotos = (e: MouseEvent<HTMLButtonElement>): void => {
        e.stopPropagation();
        navigate({pathname: `/gallery`, search: `user=${props.photo.user_id._id}`})
        dispatch(getUserName(props.photo.user_id._id))
    }

    return (
        <>
            <Modal
                show={show}
                closed={imageCancelHandler}
                image={`${import.meta.env.VITE_BASE_URL}uploads/${props.photo.image}`}
                title={props.photo.title}
            />
            <div className={styles.PhotoItem} onClick={imageHandler}>
                <div className={styles.PhotoItem__imageFrame}>
                    <img 
                        className={styles.PhotoItem__image}
                        src={`${import.meta.env.VITE_BASE_URL}uploads/${props.photo.image}`} 
                        alt={props.photo.title}
                        onError={(e) => {
                            e.currentTarget.src = defaultImg
                        }} 
                    />
                </div>
                <h3>
                    {props.photo.title}
                    <hr/>
                    By: <span className={styles.PhotoItem__UserName} onClick={userPhotos}>{props.photo.user_id.username}</span>
                </h3>
            </div>
        </>
    )
}
export default PhotoItem
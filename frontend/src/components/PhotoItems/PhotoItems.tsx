import PhotoItem from './PhotoItem/PhotoItem';
import styles from './PhotoItems.module.css';
import IPhotoItemsProps from './IPhotoItemsProps';

const PhotoItems: React.FunctionComponent<IPhotoItemsProps> = (props): React.ReactElement => {
    return (
        <div className={styles.PhotoItems}>
            {props.photos?.length ? 
                props.photos.map((el) => {
                    return <PhotoItem
                    key={el._id}
                    photo={el}
                    />
                }):<h1>Photo not found</h1>}
        </div>
    )
}

export default PhotoItems
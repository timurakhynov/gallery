import { FunctionComponent, ReactElement, useEffect } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import PhotoItems from '../../components/PhotoItems/PhotoItems'
import { getPhotos } from '../../store/photos/photos.slice'
import { AppDispatch, AppState } from '../../store/store'
import styles from './Gallery.module.css'

const Gallery: FunctionComponent = (): ReactElement => {
    const dispatch: AppDispatch = useDispatch()
    const {photos} = useSelector((state: AppState) => state.photos, shallowEqual)
    
    useEffect(() => {
        dispatch(getPhotos())
    }, [])

    return (
        <div className={styles.GalleryPage}>
            <PhotoItems
                photos={photos}
            />
        </div>
    )
}

export default Gallery
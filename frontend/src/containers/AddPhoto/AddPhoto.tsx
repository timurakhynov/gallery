import { useNavigate, useSearchParams } from 'react-router-dom';
import styles from './AddPhoto.module.css';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { AppDispatch } from '../../store/store';
import { useDispatch } from 'react-redux';
import IPhotoDto from '../../interfaces/IPhotoDto';
import IFileInput from '../../interfaces/IFileInput';
import Button from '../../components/UI/Button/Button';
import { addPhoto, getPhotos } from '../../store/photos/photos.slice';

const AddPhoto: React.FunctionComponent = (): React.ReactElement => {
    const navigate = useNavigate();
    const fileInput = useRef(null)
    const dispatch: AppDispatch = useDispatch();
    const [searchParams, setSearchParams] = useSearchParams();
    const user_id = searchParams.get('user')
    const [imageErrorMessage, setImageErrorMessage] = useState<string>('');
    const [TitleErrorMessage, setTitleErrorMessage] = useState<string>('');
    const [inputValues, setInputValues] = useState<IPhotoDto>({
        title: '',
        image: undefined
    });

    const [fileName, setFileName] = useState<string>('')
    const inputHandler = (e: ChangeEvent<HTMLInputElement>): void => {
        e.target.name === 'title' ? setTitleErrorMessage('') : setImageErrorMessage('')
        setInputValues(prevState => {
            return {...prevState, [e.target.name]: e.target.value}
        });
    };

    const inputFileHandler = (e: ChangeEvent<HTMLInputElement>): void => {
        setImageErrorMessage('')
        const file = e.target.files && e.target.files[0]
        if (file) {
            if(file && /\.(jpg|jpeg|png|gif)$/i.test(file.name)) {
                setInputValues(prevState => {
                    return {...prevState, 
                        image: e.target.files ? e.target.files[0] : undefined}
                })
                setFileName(e.target.files && e.target.files[0] ? e.target.files[0].name : '')
            } else {
                alert('Please select a valid image file (jpg, jpeg, png or gif)')
            };
        };
    };

    const cancelFileHandler = () => {
        const inputCurrent = fileInput.current! as IFileInput
        inputCurrent.value = ''
        setFileName('');
        setInputValues(prevState => {
            return {...prevState, 
                image: undefined}
        });
    };

    useEffect(() => {
        user_id ? '' : navigate('/')
    }, [])

    const submitHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        if (inputValues.title.trim() === '') {
            setTitleErrorMessage('Title is required!')
            return;
        };
        if (!inputValues.image) {
            setImageErrorMessage('Image not selected!')
            return;
        };
        const formData = new FormData()
        Object.entries(inputValues).forEach(entry => {
            const [key, value] = entry;
            formData.append(key, value)
        })
        await dispatch(addPhoto(formData));
        await dispatch(getPhotos(user_id!));
        navigate(-1)
    };

    return (
        <div className={styles.AddPhoto_container}>
            <div className={[styles.AddPhoto_background, styles.AddPhoto_flex_row].join(' ')}>
                <div className={styles.AddPhoto}>
                    <h2 className={styles.AddPhoto_title}>Add new photo:</h2>
                    <div className={styles.AddPhoto_form_column}>
                        <form onSubmit={submitHandler}>
                            <div className={styles.AddPhoto_form_box}>
                                <label className={styles.AddPhoto_label} htmlFor='title'>Title:</label>
                                <p className={styles.AddPhoto_error_text}>{TitleErrorMessage}</p>
                                <input className={styles.AddPhoto_input}
                                    type="text"
                                    onChange={inputHandler}
                                    name={'title'}
                                    value={inputValues.title}
                                />
                                <p className={styles.AddPhoto_error_text}>{imageErrorMessage}</p>
                                <div className={styles.AddPhoto_fileInput_label_div}>
                                    <label className={styles.AddPhoto_fileInput_label}>
                                        <input
                                            className={styles.AddPhoto_fileInput}
                                            type="file"
                                            name={'image'}
                                            onChange={inputFileHandler}
                                            ref={fileInput}
                                        />
                                        <p className={styles.AddPhoto_fileInput_button}>
                                            Choose file
                                        </p>
                                    </label>
                                    <span className={styles.AddPhoto_fileInput_filename}>{fileName}</span>
                                    {fileName && (
                                        <h5 className={styles.AddPhoto_fileInput_button_cancel} onClick={cancelFileHandler}>
                                            Cancel
                                        </h5>
                                    )}
                                </div>
                                <Button
                                    label={'Create photo'}
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddPhoto
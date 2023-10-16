import React, { useEffect, useState } from 'react'
import IUserDto from '../../interfaces/IUserCreateDto'
import styles from './Register.module.css'
import eye from '../../assets/img/eye.svg'
import eyeClosed from '../../assets/img/eye-closed.svg'
import {useLocation, useNavigate} from 'react-router-dom'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { AppDispatch, AppState } from '../../store/store'
import {clearError, register} from '../../store/users/users.slice'
import Button from '../UI/Button/Button'


const Register: React.FunctionComponent = (): React.ReactElement => {
    const {isAuth, registerShowError, registerErrorMessage} = useSelector((state: AppState) => state.users, shallowEqual)
    const navigate = useNavigate()
    const location = useLocation()
    const dispatch: AppDispatch = useDispatch()
    const [passwordFieldErrorMessage, setPasswordFieldErrorMessage] = useState<string>('');
    const [usernameFieldErrorMessage, setUsernameFieldErrorMessage] = useState<string>('');
    const [passwordStatus, setPasswordStatus] = useState(false)
    const [passwordRepeatStatus, setPasswordRepeatStatus] = useState(false)
    const [values, setValues] = useState<IUserDto & { password_repeat: string  }>({
        username: '',
        password: '',
        password_repeat: ''
    })
    const inputHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
        dispatch(clearError());
        setUsernameFieldErrorMessage('');
        setPasswordFieldErrorMessage('');
        setValues(prevState => {
            return {...prevState, [e.target.name]: e.target.value}
        })
    }

    useEffect(() => {
        isAuth && navigate(location.state?.from ? location.state.from : '/')
    }, [isAuth])

    const registerHandler = async (e: React.FormEvent) => {
        e.preventDefault()
        if (values.username.trim() === '') {
            setUsernameFieldErrorMessage('Username is required!')
            return;
        };
        if (values.password.trim() === '') {
            setPasswordFieldErrorMessage('Password is required!')
            return;
        };
        if (values.password !== values.password_repeat) {
            setPasswordFieldErrorMessage('Passwords are deferent!')
            return;
        };
        await dispatch(register(
            {
                username: values.username,
                password: values.password
            }
        ));
        isAuth && navigate(location.state?.from ? location.state.from : '/')
    }

    const changePasswordStatus = () => {
        setPasswordStatus(!passwordStatus)
    }

    const changePasswordRepeatStatus = () => {
        setPasswordRepeatStatus(!passwordRepeatStatus)
    }

    return (
        <div className={styles.RegisterPage_container}>
            <div className={[styles.RegisterPage_background, styles.RegisterPage_flex_row].join(' ')}>
                <div className={styles.RegisterPage_column}>
                    <h3 className={styles.RegisterPage_subtitle}>Register:</h3>
                    {registerShowError ? <p className={styles.RegisterPage_error_text}>{registerErrorMessage}</p> : null}
                    <div className={styles.RegisterPage_form_column}>
                        <form onSubmit={registerHandler}>
                            <div className={styles.RegisterPage_form_box}>
                                <label className={styles.RegisterPage_label} htmlFor='username'>Username:</label>
                                <p className={styles.RegisterPage_error_text}>{usernameFieldErrorMessage}</p>
                                <input className={[styles.RegisterPage_input, styles.RegisterPage_input_password_name].join(' ')}
                                    type="text"
                                    onChange={inputHandler}
                                    name={'username'}
                                    value={values.username}
                                />
                                <label className={styles.RegisterPage_label} htmlFor='password'>Password:</label>
                                <p className={styles.RegisterPage_error_text}>{passwordFieldErrorMessage}</p>
                                <label className={[styles.RegisterPage_label_password, styles.RegisterPage_input].join(' ')}>
                                    <input className={[styles.RegisterPage_input_password, styles.RegisterPage_input_password_name].join(' ')}
                                        type={passwordStatus ? 'text' : 'password'}
                                        onChange={inputHandler}
                                        name={'password'}
                                        value={values.password}
                                    />
                                    <img src={passwordStatus ? eyeClosed : eye} alt="eye" className={styles.RegisterPage_input_eye} onClick={changePasswordStatus}/>
                                </label>
                                <label className={styles.RegisterPage_label} htmlFor='password_repeat'>Repeat password:</label>
                                <label className={[styles.RegisterPage_label_password, styles.RegisterPage_input].join(' ')}>
                                    <input className={[styles.RegisterPage_input_password, styles.RegisterPage_input_password_name].join(' ')}
                                        type={passwordRepeatStatus ? 'text' : 'password'}
                                        onChange={inputHandler}
                                        name={'password_repeat'}
                                        value={values.password_repeat}
                                    />
                                    <img src={passwordRepeatStatus ? eyeClosed : eye} alt="eye" className={styles.RegisterPage_input_eye} onClick={changePasswordRepeatStatus}/>
                                </label>
                                <Button
                                    label={'Save'}
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register
import React, { useEffect, useState } from 'react'
import IUserDto from '../../interfaces/IUserCreateDto'
import styles from './Login.module.css'
import eye from '../../assets/img/eye.svg';
import eyeClosed from '../../assets/img/eye-closed.svg';
import {Link, useNavigate} from 'react-router-dom'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { AppDispatch, AppState } from '../../store/store'
import {clearError, login} from '../../store/users/users.slice'
import Button from '../UI/Button/Button'


const Login: React.FunctionComponent = (): React.ReactElement => {
    const {isAuth, loginShowError, loginErrorMessage} = useSelector((state: AppState) => state.users, shallowEqual)
    const dispatch: AppDispatch = useDispatch()
    const navigate = useNavigate()
    const [passwordFieldErrorMessage, setPasswordFieldErrorMessage] = useState<string>('')
    const [usernameFieldErrorMessage, setUsernameFieldErrorMessage] = useState<string>('')
    const [passwordStatus, setPasswordStatus] = useState(false)
    const [values, setValues] = useState<IUserDto>({
        username: '',
        password: ''
    })
    const inputHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
        dispatch(clearError())
        setUsernameFieldErrorMessage('')
        setPasswordFieldErrorMessage('')
        setValues(prevState => {
            return {...prevState, [e.target.name]: e.target.value}
        })
    }
    const loginHandler = async (e: React.FormEvent) => {
        e.preventDefault()
        if (values.username.trim() === '') {
            setUsernameFieldErrorMessage('Username is required!')
            return;
        };
        if (values.password.trim() === '') {
            setPasswordFieldErrorMessage('Password is required!')
            return;
        };
        dispatch(login(values))
    }
    useEffect(() => {
        if (isAuth) {
            navigate('/')
        }
    }, [isAuth])

    const changePasswordStatus = () => {
        setPasswordStatus(!passwordStatus)
    }

    return (
       <div className={styles.LoginPage_container}>
            <div className={[styles.LoginPage_background, styles.LoginPage_flex_row].join(' ')}>
                <div className={styles.LoginPage_column}>
                    <h3 className={styles.LoginPage_subtitle}>Login:</h3>
                    {loginShowError ? <p className={styles.LoginPage_error_text}>{loginErrorMessage}</p> : null}
                    <div className={styles.LoginPage_form_column}>
                        <form onSubmit={loginHandler}>
                            <div className={styles.LoginPage_form_box}>
                                <label className={styles.LoginPage_label} htmlFor='username'>Username:</label>
                                <p className={styles.LoginPage_error_text}>{usernameFieldErrorMessage}</p>
                                <input className={[styles.LoginPage_input, styles.LoginPage_input_password_name].join(' ')}
                                    type="text"
                                    onChange={inputHandler}
                                    name={'username'}
                                    value={values.username}
                                />
                                <label className={styles.LoginPage_label} htmlFor='password'>Password:</label>
                                <p className={styles.LoginPage_error_text}>{passwordFieldErrorMessage}</p>
                                <label className={[styles.LoginPage_label_password, styles.LoginPage_input].join(' ')}>
                                    <input className={[styles.LoginPage_input_password, styles.LoginPage_input_password_name].join(' ')}
                                        type={passwordStatus ? 'text' : 'password'}
                                        onChange={inputHandler}
                                        name={'password'}
                                        value={values.password}
                                    />
                                    <img src={passwordStatus ? eyeClosed : eye} alt="eye" className={styles.LoginPage_input_eye} onClick={changePasswordStatus}/>
                                </label>
                                <div className={styles.LoginPage_btn_row}>
                                    <Link to={'/register'} className={styles.LoginPage_link}>Sign up now</Link>
                                    <Button
                                        label={'Sign in'}
                                    />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
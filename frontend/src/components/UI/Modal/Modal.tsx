import React from "react";
import styles from './Modal.module.css';
import defaultImg from '../../../assets/img/default.png';
import Backdrop from "../Backdrop/Backdrop";
import IModalProps from "./IModalProps";

const Modal: React.FunctionComponent<IModalProps> = (props): React.ReactElement => {
    return (
        <>
            <Backdrop
                show={props.show}
                clicked={props.closed}
            />
            <img 
                className={styles.Modal}
                src={props.image} 
                        alt={props.title}
                        onError={(e) => {
                            e.currentTarget.src = defaultImg
                        }} 
                style={{
                    transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: props.show ? '1' : '0'
                }}
            />
        </>
    )
}

export default Modal
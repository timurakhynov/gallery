import React from 'react';
import styles from './Backdrop.module.css';
import IBackdropProps from './IBackdropProps';


const Backdrop: React.FunctionComponent<IBackdropProps> = (props): React.ReactElement => {
    return (
        <>
            {props.show ? <div onClick={props.clicked} className={styles.Backdrop}/> : null}
        </>
    )
}

export default Backdrop
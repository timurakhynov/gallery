import styles from './Button.module.css';
import IButtonProps from './IButtonProps';

const Button: React.FunctionComponent<IButtonProps> = (props) => {
    return (
        <button
            onClick={props.click === undefined ? undefined : props.click}
            className={styles.Button}
            disabled={props.disabled === undefined ? false : props.disabled}
        >
            {props.label}
        </button>
    );
};

export default Button;
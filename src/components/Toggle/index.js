import styles from './index.module.css';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

export const Toggle = (props) => {
    const {
        left = '',
        right = '',
        className,
        onChange = () => {},
    } = props;

    return <div className={cx(styles.toggle, className)}>
        <span className={cx(styles.item)}>{left}</span>
        <span className={cx(styles.item)}>{right}</span>
    </div>
}
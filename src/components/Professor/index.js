import styles from './index.module.css';
import classNames from 'classnames/bind';
import RMPIcon from '../../assets/icons/rmp.svg';
import { TEXT } from '../../lib/constants';
const cx = classNames.bind(styles);

export const Professor = (props) => {
    const {
        name,
        over_rate,
        diff_rate,
        tid,
    } = props;

    return <div 
        className={cx(styles.block)}
    >
        <div className={cx(styles.row)}>
            <span className={cx(styles.name)}>{name}</span>
            <span className={cx(styles.overRate)}>{`${TEXT.OVERALL_QUALITY}${over_rate}`}</span>
        </div>
        <div className={cx(styles.row)}>
            <a href={tid} target='_blank'><img className={cx(styles.tid)} src={RMPIcon}/></a>
            <span className={cx(styles.diffRate)}>{`${TEXT.DIFFICULTY}${diff_rate}`}</span>
        </div>
    </div>
}
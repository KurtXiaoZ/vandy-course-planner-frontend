import styles from './index.module.css';
import classNames from 'classnames/bind';
import RMPIcon from '../../assets/icons/rmp.svg';
import { TEXT } from '../../lib/constants';
import PropTypes from 'prop-types';
const cx = classNames.bind(styles);

// RMP professor card
export const Professor = (props) => {
    const {
        name,
        over_rate,
        diff_rate,
        tid,
    } = props;

    return <div 
        className={cx(styles.block)}
        data-testid='professor'
    >
        <div className={cx(styles.row)}>
            <span className={cx(styles.name)} data-testid='professor-name'>{name}</span>
            <span className={cx(styles.overRate)} data-testid='professor-overall-rate'>{`${TEXT.OVERALL_QUALITY}${over_rate}`}</span>
        </div>
        <div className={cx(styles.row)}>
            <a href={tid} target='_blank' data-testid='professor-tid'><img className={cx(styles.tid)} src={RMPIcon}/></a>
            <span className={cx(styles.diffRate)} data-testid='professor-difficulty-rate'>{`${TEXT.DIFFICULTY}${diff_rate}`}</span>
        </div>
    </div>
}

Professor.propTypes = {
    name: PropTypes.string,
    over_rate: PropTypes.number,
    diff_rate: PropTypes.number,
    tid: PropTypes.string,
}
import styles from './index.module.css';
import classNames from 'classnames/bind';
import RMPIcon from '../../assets/icons/rmp.svg';
import { COURSE, TEXT } from '../../lib/constants';
import PropTypes from 'prop-types';
const cx = classNames.bind(styles);

const overRateColor = (rating) => {
    if (rating === 0) {
        return styles.rateNa;
    } else if (rating > 3.5) {
        return styles.rateGood;
    } else if (rating >= 3) {
        return styles.rateMid;
    } else {
        return styles.rateBad;
    }
}

const diffRateColor = (rating) => {
    if (rating === 0) {
        return styles.rateNa;
    } else if (rating <= 2) {
        return styles.rateGood;
    } else if (rating < 4) {
        return styles.rateMid;
    } else {
        return styles.rateBad;
    }
}

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
            <span
                className={cx(styles.name)}
                data-testid='professor-name'
            >
                {name}
            </span>
            <span
                className={cx(overRateColor(over_rate))}
                data-testid='professor-overall-rate'
            >
                {`${TEXT.OVERALL_QUALITY}${over_rate === 0 ? "NA" : over_rate}`}
            </span>
        </div>
        <div className={cx(styles.row)}>
            <a
                href={COURSE.RMP + tid}
                target='_blank'
                rel="noreferrer"
                data-testid='professor-tid'
            >
                <img className={cx(styles.tid)} src={RMPIcon}/>
            </a>
            <span
                className={cx(diffRateColor(diff_rate))}
                data-testid='professor-difficulty-rate'
            >
                {`${TEXT.DIFFICULTY}${diff_rate === 0 ? "NA" : diff_rate}`}
            </span>
        </div>
    </div>
}

Professor.propTypes = {
    name: PropTypes.string,
    over_rate: PropTypes.number,
    diff_rate: PropTypes.number,
    tid: PropTypes.number,
}
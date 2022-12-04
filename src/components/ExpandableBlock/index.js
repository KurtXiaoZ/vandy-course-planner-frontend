import styles from './index.module.css';
import classNames from 'classnames/bind';
import RightArrowIcon from '../../assets/icons/rightArrow.svg';
import FulfilledIcon from '../../assets/icons/statusSelected.svg';
import PropTypes from 'prop-types';
import { useState } from 'react';
const cx = classNames.bind(styles);

// Button component for the top navigation bar at Home page
export const ExpandableBlock = (props) => {
    const {
        className,
        title,
        fulfilled = false,
        children
    } = props;
    const [expand, setExpand] = useState(false);
    const [animatedExpand, setAnimatedExpand] = useState(false);

    const onClick = () => {
        if(expand) {
            setAnimatedExpand(false);
            setTimeout(() => setExpand(false), 1000);
        }
        else {
            setTimeout(() => setAnimatedExpand(true), 100);
            setExpand(true);
        }
    }

    return <div 
        className={cx(styles.block, className)}
        data-testid='exandable-block'
    >
        <div 
            onClick={onClick}
            className={cx(styles.header, {
                [styles.expand]: animatedExpand,
            })} 
            data-testid='exandable-block-header'
        >
            <span className={cx(styles.title)} data-testid='exandable-block-title'>
                {title}
            </span>
            {fulfilled 
            ? <img 
                src={FulfilledIcon}
                className={cx(styles.fulfilledIcon)}
                data-testid='exandable-block-icon'
            />
            : <img 
                src={RightArrowIcon}
                className={cx(styles.arrowIcon)}
                style={{transform: `rotate(${animatedExpand ? '90deg' : '180deg'})`}}
                data-testid='exandable-block-icon'
            />}
        </div>
        {expand && <div className={cx(styles.content, {[styles.expand]: animatedExpand})} data-testid='exandable-block-content'>
            {children}
        </div>}
    </div>
};

ExpandableBlock.propTypes = {
    className: PropTypes.string,
    title: PropTypes.string,
    children: PropTypes.array,
    fulfilled: PropTypes.bool
}
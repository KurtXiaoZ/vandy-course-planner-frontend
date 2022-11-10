import styles from './index.module.css';
import classNames from 'classnames/bind';
import RightArrowIcon from '../../assets/icons/rightArrow.svg';
import PropTypes from 'prop-types';
import { useState } from 'react';
const cx = classNames.bind(styles);

// Button component for the top navigation bar at Home page
export const ExpandableBlock = (props) => {
    const {
        className,
        title,
        children
    } = props;
    const [expand, setExpand] = useState(false);

    const onClick = () => {
        setExpand(!expand);
    }

    return <div 
        className={cx(styles.block, className)}
        onClick={onClick}
        data-testid='exandable-block'
    >
        <div className={cx(styles.header, {[styles.expand]: expand})} data-testid='exandable-block-header'>
            <span className={cx(styles.title)} data-testid='exandable-block-title'>
                {title}
            </span>
            <img 
                src={RightArrowIcon}
                className={cx(styles.arrow)}
                style={{transform: `rotate(${expand ? '90deg' : '180deg'})`}}
                data-testid='exandable-block-icon'
            />
        </div>
        <div className={cx(styles.content, {[styles.expand]: expand})} data-testid='exandable-block-content'>
            {children}
        </div>
    </div>
};

ExpandableBlock.propTypes = {
    className: PropTypes.string,
    title: PropTypes.string,
    children: PropTypes.object
}
/**
 * CS4287 Project
 * Author: Zechuan Xiao
 * Email: zechuan.xiao@vanderbilt.edu
 */

import styles from './index.module.css';
import classNames from 'classnames/bind';
import { useWindowSize } from '../../lib/hooks';
import { SCREEN } from '../../lib/constants';
import PropTypes from 'prop-types';
const cx = classNames.bind(styles);

// Button component for the top navigation bar at Home page
export const TopNavButton = (props) => {
    const {
        icon,
        text = '',
        className,
        style,
        onClick = () => undefined
    } = props;
    const { type, width } = useWindowSize();
    const isSmallScreen = type === SCREEN.MOBILE || width < 500;

    return <div 
        className={cx(styles.button, className)}
        style={style}
        onClick={onClick}
        data-testid='top-nav-button-wrapper'
    >
        {icon && <img 
            src={icon} 
            className={cx(styles.icon, {[styles.smallScreen]: isSmallScreen})}
            data-testid='top-nav-button-icon'
        />}
        {text && <span
            className={cx(styles.text , {[styles.smallScreen]: isSmallScreen})}
            data-testid='top-nav-button-text'
        >
            {text}
        </span>}
    </div>
};

TopNavButton.propTypes = {
    icon: PropTypes.string,
    text: PropTypes.string,
    className: PropTypes.string,
    style: PropTypes.object,
    onClick: PropTypes.func
}
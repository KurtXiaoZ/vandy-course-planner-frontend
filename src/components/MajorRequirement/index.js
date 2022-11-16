import styles from './index.module.css';
import classNames from 'classnames/bind';
import { ExpandableBlock } from '../ExpandableBlock';
import { COURSE_STATUS, TEXT } from '../../lib/constants';
import React from 'react';
import { ClassHeader } from '../ClassHeader';
import PropTypes from 'prop-types';
const cx = classNames.bind(styles);

// The expandable major requirement block 
export const MajorRequirement = React.forwardRef((props, ref) => {
    const {
        title,
        description,
        units,
        selected
    } = props;

    return <ExpandableBlock
        title={title}
    >
        <div className={cx(styles.text)} data-testid='major-requirement-description'>
            <strong>{TEXT.DESCRIPTION}</strong>
            {description}
        </div>
        <div className={cx(styles.text)} data-testid='major-requirement-units'>
            <strong>{TEXT.UNITS}</strong>
            {units}
        </div>
        {selected.map(course => <ClassHeader 
            classInfo={course}
            status={COURSE_STATUS.SELECTED}
            ref={ref}
        />)}
    </ExpandableBlock>
});

MajorRequirement.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    units: PropTypes.string,
    selected: PropTypes.array
}
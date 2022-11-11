import styles from './index.module.css';
import classNames from 'classnames/bind';
import { ExpandableBlock } from '../ExpandableBlock';
import { COURSE_STATUS, TEXT } from '../../lib/constants';
import { Class } from '../Class';
import React from 'react';
const cx = classNames.bind(styles);

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
        <div className={cx(styles.text)}>
            <strong>{TEXT.DESCRIPTION}</strong>
            {description}
        </div>
        <div className={cx(styles.text)}>
            <strong>{TEXT.UNITS}</strong>
            {units}
        </div>
        {selected.map(course => <Class 
            classInfo={course}
            headerOnly
            status={COURSE_STATUS.SELECTED}
            ref={ref}
        />)}
    </ExpandableBlock>
})
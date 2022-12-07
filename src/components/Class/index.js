/**
 * CS4287 Project
 * Author: Zechuan Xiao
 * Email: zechuan.xiao@vanderbilt.edu
 */

import styles from './index.module.css';
import classNames from 'classnames/bind';
import React, { useRef, useState } from 'react';
import { COURSE, COURSE_STATUS, TEXT } from '../../lib/constants.js';
import { emptyReqs, getIcon, parsePrereqs, parseCoreqs } from '../../lib/util';
import { Professor } from '../Professor';
import { useAuth, useWindowSize } from '../../lib/hooks';
import PropTypes from 'prop-types';
import { postSavings } from '../../lib/services';
import { toast } from 'react-toastify';
const cx = classNames.bind(styles);

// The Class component for the left course list
export const Class = React.forwardRef((props, ref) => {
    const {
        className,
        classInfo,
        updateSavings,
        updateHistory
    } = props;
    const {
        number,
        subject,
        name,
        prereqs,
        coreqs,
        frequency,
        professors,
        status = COURSE_STATUS.ABLE
    } = classInfo;
    const { width } = useWindowSize();
    const { authEmail } = useAuth();
    const [expand, setExpand] = useState(false);
    const [dragging, setDragging] = useState(false);
    const [movableX, setMovableX] = useState(0);
    const [movableY, setMovableY] = useState(0);
    const dragOffset = useRef({ x: null, y: null });
    const dragRef = useRef();
    const header = useRef();

    const onDragStart = (e) => {
        const { x: headerX, y: headerY } = header.current.getBoundingClientRect();
        dragOffset.current.x = e.clientX - headerX;
        dragOffset.current.y = e.clientY - headerY;
        window.addEventListener('mousemove', onDragging);
        window.addEventListener('mouseup', onDragEnd);
    }

    const onDragging = (e) => {
        if(!dragRef.current) {
            dragRef.current = true;
            setDragging(true);
        }
        const { x: rightListX, y: rightListY } = ref?.current?.getBoundingClientRect();
        if(e.clientX > rightListX 
        && e.clientX < rightListX + ref?.current?.offsetWidth
        && e.clientY > rightListY
        && e.clientY < rightListY + ref?.current?.offsetHeight) {
            ref.current.style.opacity = '0.4';
        }
        else ref.current.style.opacity = null;
        setMovableX(e.clientX - dragOffset.current.x);
        setMovableY(e.clientY - dragOffset.current.y);
    }

    const onDragEnd = (e) => {
        if(!dragRef.current) {
            setExpand(!expand);
        }
        const { x: rightListX, y: rightListY } = ref?.current?.getBoundingClientRect();
        if(e.clientX > rightListX 
            && e.clientX < rightListX + ref?.current?.offsetWidth
            && e.clientY > rightListY
            && e.clientY < rightListY + ref?.current?.offsetHeight) {
            postSavings({ email: authEmail, subject, number })
                .then(res => {
                    const { code } = res;
                    if(code === 200) {
                        updateHistory({ type: COURSE.ADD, subject, number });
                        updateSavings();
                    }
                    else toast('Error saving course');
                })
                .catch(() => toast('Error saving course'));
        }
        ref.current.style.opacity = null;
        dragRef.current = false;
        dragOffset.current = { x: null, y: null };
        setDragging(false);
        window.removeEventListener('mousemove', onDragging);
        window.removeEventListener('mouseup', onDragEnd);
    }

    return <>
        {dragging && <div 
            className={cx(styles.moveable, styles[status])}
            style={{
                left: `${movableX}px`,
                top: `${movableY}px`,
                width: `${header.current.offsetWidth}px`
            }}
        >
            <span className={cx(styles.code)}>{`${subject} ${(number % 10000)}`}</span>
            <div className={cx(styles.name)}>{name}</div>
            <img className={cx(styles.status)} src={getIcon(status)}/>
        </div>}
        <div 
            className={cx(styles.block, styles[status], className, {[styles.dragging]: dragging})}
            data-testid='class-wrapper'
        >
            <div 
                className={cx(styles.header, styles[status], {[styles.expand]: expand})}
                ref={header}
                data-testid='class'
                onMouseDown={status === COURSE_STATUS.ABLE ? onDragStart : undefined}
                onClick={status !== COURSE_STATUS.ABLE ? () => setExpand(!expand) : undefined}
            >
                <span className={cx(styles.code)} data-testid='class-code'>{`${subject} ${(number % 10000)}`}</span>
                <div className={cx(styles.name)} data-testid='class-name'>{name}</div>
                <img className={cx(styles.status)} src={getIcon(status)} data-testid='class-status'/>
            </div>
            <div className={cx(styles.content, {[styles.expand]: expand})}>
                {!emptyReqs(prereqs) && <div className={cx(styles.row)}>
                    <span className={cx(styles.rowLabel)}>{TEXT.PREREQUISITES}</span>
                    <div className={cx(styles.rowContent)} data-testid='class-prereqs'>{parsePrereqs(prereqs)}</div>
                </div>}
                {!emptyReqs(coreqs) && <div className={cx(styles.row)}>
                    <span className={cx(styles.rowLabel)}>{TEXT.COREQUISITES}</span>
                    <div className={cx(styles.rowContent)} data-testid='class-coreqs'>{parseCoreqs(coreqs)}</div>
                </div>}
                {frequency && <div className={cx(styles.row)}>
                    <span className={cx(styles.rowLabel)}>{TEXT.FREQUENCY}</span>
                    <div className={cx(styles.rowContent)} data-testid='class-frequency'>{frequency}</div>
                </div>}
                {professors.length > 0 && <div className={cx(styles.row)}>
                    <span className={cx(styles.rowLabel)}>{TEXT.PROFESSORS}</span>
                </div>}
                {professors?.map(professor => <Professor 
                    key={professor.tid}
                    {...professor}
                />)}
            </div>
        </div>
    </>
});

Class.propTypes = {
    className: PropTypes.string,
    classInfo: PropTypes.object,
    status: PropTypes.string,
    updateSavings: PropTypes.func
}
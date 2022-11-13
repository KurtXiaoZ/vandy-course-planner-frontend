import styles from './index.module.css';
import classNames from 'classnames/bind';
import React, { useRef, useState } from 'react';
import { COURSE_STATUS, TEXT } from '../../lib/constants.js';
import { getIcon, parsePrereqs } from '../../lib/util';
import { Professor } from '../Professor';
import { useWindowSize } from '../../lib/hooks';
import PropTypes from 'prop-types';
const cx = classNames.bind(styles);

// The Class component for the left course list
export const Class = React.forwardRef((props, ref) => {
    const {
        className,
        classInfo,
        status = COURSE_STATUS.NOT_ABLE,
    } = props;
    const {
        number,
        subject,
        name,
        prereqs,
        coreqs,
        frequency,
        professors
    } = classInfo;
    const { width } = useWindowSize();
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
            console.log('call savings');
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
            <span className={cx(styles.code)}>{`${subject} ${number}`}</span>
            <div className={cx(styles.name)}>{name}</div>
            <img className={cx(styles.status)} src={getIcon(status)}/>
        </div>}
        <div 
            className={cx(styles.block, styles[status], className, {[styles.dragging]: dragging})}
            data-testid='class-wrapper'
        >
            <div 
                className={cx(styles.header, styles[status], {[styles.expand]: expand})}
                onMouseDown={onDragStart}
                ref={header}
                data-testid='class'
            >
                <span className={cx(styles.code)} data-testid='class-code'>{`${subject} ${number}`}</span>
                <div className={cx(styles.name)} data-testid='class-name'>{name}</div>
                <img className={cx(styles.status)} src={getIcon(status)} data-testid='class-status'/>
            </div>
            <div className={cx(styles.content, {[styles.expand]: expand})}>
                <div className={cx(styles.row)}>
                    <span className={cx(styles.rowLabel)}>{TEXT.PREREQUISITES}</span>
                    <div className={cx(styles.rowContent)} data-testid='class-prereqs'>{parsePrereqs(prereqs)}</div>
                </div>
                <div className={cx(styles.row)}>
                    <span className={cx(styles.rowLabel)}>{TEXT.COREQUISITES}</span>
                    <div className={cx(styles.rowContent)} data-testid='class-coreqs'>{parsePrereqs(coreqs)}</div>
                </div>
                <div className={cx(styles.row)}>
                    <span className={cx(styles.rowLabel)}>{TEXT.FREQUENCY}</span>
                    <div className={cx(styles.rowContent)} data-testid='class-frequency'>{frequency}</div>
                </div>
                <div className={cx(styles.row)}>
                    <span className={cx(styles.rowLabel)}>{TEXT.PROFESSORS}</span>
                </div>
                {professors?.map(professor => <Professor 
                    {...professor}
                />)}
            </div>
        </div>
    </>
});

Class.propTypes = {
    className: PropTypes.string,
    classInfo: PropTypes.object,
    status: PropTypes.string
}
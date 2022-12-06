import styles from './index.module.css';
import classNames from 'classnames/bind';
import React, { useRef, useState } from 'react';
import { COURSE, COURSE_STATUS } from '../../lib/constants.js';
import { getIcon } from '../../lib/util';
import PropTypes from 'prop-types';
import { deleteSavings } from '../../lib/services';
import { useAuth } from '../../lib/hooks';
import { toast } from 'react-toastify';
const cx = classNames.bind(styles);

// The class component for the right course list
export const ClassHeader = React.forwardRef((props, ref) => {
    const {
        className,
        classInfo,
        status,
        updateSavings,
        updateHistory
    } = props;
    const {
        number,
        subject,
        name,
    } = classInfo;
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
            deleteSavings({ email: authEmail, subject, number })
                .then(res => {
                    const { code } = res;
                    if(code === 200) {
                        updateHistory({ type: COURSE.DELETE, subject, number });
                        updateSavings();
                    }
                    else if(code === 400) toast('Unable to remove course as other courses depend on it');
                    else toast('Error removing course');
                })
                .catch(() => toast('Error removing course'));
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
            data-testid='class-header-dragging'
        >
            <span className={cx(styles.code)}>{`${subject} ${number % 10000}`}</span>
            <div className={cx(styles.name)}>{name}</div>
            <img className={cx(styles.status)} src={getIcon(status)}/>
        </div>}
        <div 
            className={cx(styles.block, styles[status], className, {[styles.dragging]: dragging})}
            data-testid='class-header'
        >
            <div 
                className={cx(styles.header, styles[status], {[styles.expand]: expand})}
                onMouseDown={onDragStart}
                ref={header}
            >
                <span className={cx(styles.code)} data-testid='class-header-code'>{`${subject} ${number % 10000}`}</span>
                <div className={cx(styles.name)} data-testid='class-header-name'>{name}</div>
                <img className={cx(styles.status)} src={getIcon(status)} data-testid='class-header-icon'/>
            </div>
        </div>
    </>
});

ClassHeader.propTypes = {
    className: PropTypes.string,
    classInfo: PropTypes.object,
    status: PropTypes.string
}
import styles from './index.module.css';
import classNames from 'classnames/bind';
import { useAuth, useWindowSize } from '../../lib/hooks';
import { COURSE_STATUS, SCREEN, TEST_CLASS_INFO, TEST_COMPUTER_SCIENCE_CORE, TEXT } from '../../lib/constants';
import { TopNavButton } from '../../components/TopNavButton';
import VersionIcon from '../../assets/icons/version.svg';
import ExitIcon from '../../assets/icons/exit.svg';
import RightArrowIcon from '../../assets/icons/rightArrow.svg';
import { useRef, useState } from 'react';
import { ExpandableBlock } from '../../components/ExpandableBlock';
import { Class } from '../../components/Class';
import { MajorRequirement } from '../../components/MajorRequirement';
const cx = classNames.bind(styles);

// the Home page where users manage their courses
export const Home = () => {
    const { authName, updateAuth } = useAuth();
    const { type, width } = useWindowSize();
    const smallScreenTopNav = type === SCREEN.MOBILE || width < 500;
    const smallScreenCourseLists = type === SCREEN.MOBILE || width < 700;
    // 0 --> right, 1 --> left
    const [arrowDir, setArrowDir] = useState(0);

    const courseLists = useRef();
    const leftList = useRef();
    const rightList = useRef();
    const listShifter = useRef();

    const shiftCourseLists = () => {
        if(arrowDir === 0) courseLists.current.scrollLeft = width - 40;
        else courseLists.current.scrollLeft = 0;
        setArrowDir((arrowDir + 1) % 2);
    }

    return <div className={cx(styles.wrapper)} data-testid='home-wrapper'>
        <div className={cx(styles.topNav)} data-testid='home-topnav'>
            <span 
                className={cx(styles.topNavText, {
                    [styles.smallScreen]: smallScreenTopNav
                })}
                data-testid='home-topnav-text'
            >
                {`Hello, ${authName}`}
            </span>
            <TopNavButton
                className={cx(styles.lastVersion)}
                text={TEXT.LAST_VERSION}
                icon={VersionIcon}
            />
            <TopNavButton
                className={cx(styles.exit)}
                text={TEXT.EXIT}
                icon={ExitIcon}
                onClick={() => updateAuth({})}
            />
        </div>
        <div 
            className={cx(styles.courseLists , {
                [styles.smallScreen]: smallScreenCourseLists
            })}
            data-testid='home-courseLists'
            ref={courseLists}
        >
            <div 
                className={cx(styles.courseList, {
                    [styles.smallScreen]: smallScreenCourseLists
                })}
                style={{ minWidth: smallScreenCourseLists ? `${width - 65}px` : undefined }}
                ref={leftList}
                data-testid='left-courseList'
            >
                {<ExpandableBlock title='CS 1000 Level Course'>
                    <Class 
                        classInfo={TEST_CLASS_INFO}
                        status={COURSE_STATUS.SELECTED}
                        ref={smallScreenCourseLists ? listShifter : rightList}
                    />
                    <Class 
                        classInfo={TEST_CLASS_INFO}
                        status={COURSE_STATUS.SELECTED}
                        ref={smallScreenCourseLists ? listShifter : rightList}
                    />
                </ExpandableBlock>}
            </div>
            {smallScreenCourseLists && <div
                className={cx(styles.listShifter)}
                ref={listShifter}
                data-testid='list-shifter'
            >
                <img 
                    src={RightArrowIcon} 
                    style={{transform: arrowDir === 0 ? 'rotate(0deg)' : 'rotate(180deg)'}}
                    className={cx(styles.arrow)}
                    onClick={shiftCourseLists}
                    data-testid='list-shifter-arrow'
                />
            </div>}
            <div 
                className={cx(styles.courseList, {
                    [styles.smallScreen]: smallScreenCourseLists
                })}
                style={{ minWidth: smallScreenCourseLists ? `${width - 65}px` : undefined }}
                ref={rightList}
                data-testid='right-courseList'
            >
                {<MajorRequirement 
                    {...TEST_COMPUTER_SCIENCE_CORE}
                    ref={smallScreenCourseLists ? listShifter : leftList}
                />}
            </div>
        </div>
    </div>
}
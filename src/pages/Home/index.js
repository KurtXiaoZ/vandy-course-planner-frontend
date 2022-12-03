import styles from './index.module.css';
import classNames from 'classnames/bind';
import { useAuth, useWindowSize } from '../../lib/hooks';
import { SCREEN, TEXT, MAJOR_REQUIREMENTS, COURSE_STATUS, COURSE } from '../../lib/constants';
import { TopNavButton } from '../../components/TopNavButton';
import VersionIcon from '../../assets/icons/version.svg';
import ExitIcon from '../../assets/icons/exit.svg';
import RightArrowIcon from '../../assets/icons/rightArrow.svg';
import { useEffect, useRef, useState } from 'react';
import { ExpandableBlock } from '../../components/ExpandableBlock';
import { Class } from '../../components/Class';
import { getCourses, getSavings, classifyCrs, deleteSavings, postSavings } from '../../lib/services';
import { toast } from 'react-toastify';
import { getCourseLevels, sortCategories } from '../../lib/util';
import { MajorRequirement } from '../../components/MajorRequirement';
const cx = classNames.bind(styles);

// the Home page where users manage their courses
export const Home = () => {
    const { authName, authEmail, updateAuth } = useAuth();
    const { type, width } = useWindowSize();
    const smallScreenTopNav = type === SCREEN.MOBILE || width < 500;
    const smallScreenCourseLists = type === SCREEN.MOBILE || width < 700;
    // 0 --> right, 1 --> left
    const [arrowDir, setArrowDir] = useState(0);
    const [courseLevels, setCourseLevels] = useState([]);
    const courseLists = useRef();
    const leftList = useRef();
    const rightList = useRef();
    const listShifter = useRef();
    const courseHistory = useRef([]);
    const [courses, setCourses] = useState(null);
    const [courseSelected, setCourseSelected] = useState([]);
    const [categories, setCategories] = useState({ core: [], project: [], depth: [], seminar: [], other: [] });

    const shiftCourseLists = () => {
        if(arrowDir === 0) courseLists.current.scrollLeft = width - 40;
        else courseLists.current.scrollLeft = 0;
        setArrowDir((arrowDir + 1) % 2);
    }

    const updateSavings = () => {
        getSavings({ email: authEmail })
            .then(res => {
                const { code, obj } = res;
                if (code === 200) {
                    setCourseSelected(courses.filter((crs) => obj[crs.subject + crs.number] === COURSE_STATUS.SELECTED));
                    setCourseLevels(getCourseLevels(courses, obj));
                }
                else toast('Error fetching saving information in backend');
            })
            .catch(() => toast('Error fetching saving information'));
    };

    const updateHistory = (action) => {
        courseHistory.current.push(action);
        if(courseHistory.current.length > 5) courseHistory.current.shift();
    }

    const revertInHistory = () => {
        if(courseHistory.current.length) {
            const { type, subject, number } = courseHistory.current.pop();
            const inputs = { email: authEmail, subject, number };
            Promise.resolve(type === COURSE.ADD ? deleteSavings(inputs) : postSavings(inputs))
                .then(res => {
                    if(res?.code === 200) updateSavings();
                    else toast('Error removing course');
                })
                .catch(() => toast('Error removing course'));
        }
    }

    useEffect(() => {
        getCourses()
            .then(res => {
                const { code, obj } = res;
                if(code === 200) setCourses(obj);
                else toast('Error fetching course information');
            })
            .catch(() => toast('Error fetching course information'));
    }, []);

    useEffect(() => {
        if(courses && authEmail) updateSavings();
    }, [courses, authEmail]);

    useEffect(() => {
        const temp = { core: [], project: [], depth: [], seminar: [], other: [] };
        Promise.all(courseSelected?.map((crs) => classifyCrs({subject: crs.subject, number: crs.number})
            .then(resp => {
                const { code, obj } = resp
                if (code === 200) {
                    if (obj === "software" || obj === "hardware" || obj === "foundation") temp.core.push(crs);
                    else if (obj !== null && obj !== 'other') temp[obj].push(crs);
                    else temp.other.push(crs);
                } 
                else throw(new Error());
            })))
            .then(() => setCategories(sortCategories(temp)))
            .catch(() => toast('Error fetching course requirement information'))
    }, [courseSelected]);

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
                onClick={revertInHistory}
            />
            <TopNavButton
                className={cx(styles.exit, {[styles.smallScreen]: smallScreenTopNav})}
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
                {Object.entries(courseLevels)
                    .sort(([a, _], [b, __]) => a.localeCompare(b))
                    .map(([courseLevel, courses]) => <ExpandableBlock
                    title={courseLevel}
                    key={courseLevel}
                >
                    {courses?.map(course => <Class 
                        classInfo={course}
                        key={course.name + course.number}
                        ref={smallScreenCourseLists ? listShifter : rightList}
                        updateSavings={updateSavings}
                        updateHistory={updateHistory}
                    />)}
                </ExpandableBlock>)}
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
                {Object.entries(MAJOR_REQUIREMENTS).map(([head, content]) => <MajorRequirement
                    title={head}
                    description={content["description"]}
                    units={content["units"]}
                    selected={categories[content["simple"]]}
                    key={head}
                    updateSavings={updateSavings}
                    updateHistory={updateHistory}
                    ref={smallScreenCourseLists ? listShifter : leftList}
                />)}
            </div>
        </div>
    </div>
}
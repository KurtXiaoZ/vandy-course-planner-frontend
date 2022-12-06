import AbleIcon from '../assets/icons/statusAble.svg';
import NotAbleIcon from '../assets/icons/statusNotAble.svg';
import SelectedIcon from '../assets/icons/statusSelected.svg';
import { COURSE_STATUS } from './constants';

/**
 * Test if an element has all of the expected styles
 * @param {Object} testElement the element to be tested
 * @param {Object} styles the value of the style property
 */
export const testStyle = async (testElement, styles) => {
    for(const key in styles) {
        await expect(testElement).toHaveStyle(`${key}: ${styles[key]}`);
    }
}

/**
 * Return the icon that corresponds to course status
 * @param {String} status status of course
 * @return the icon
 */
export const getIcon = (status) => {
    if(status === COURSE_STATUS.ABLE) return AbleIcon;
    if(status === COURSE_STATUS.NOT_ABLE) return NotAbleIcon;
    if(status === COURSE_STATUS.SELECTED) return SelectedIcon;
}

/**
 * Parse to get prerequisites for a course
 * @param {Array} prereqs prerequisites for a course
 * @return prerequisites for a course
 */
export const parsePrereqs = (prereqs) => {
    const arr = prereqs?.map(x => x.join(' or '));
    return arr?.filter?.(x => x.length > 0)?.join('; and ');
}

/**
 * Parse to get corequisites for a course
 * @param {Array} coreqs corequisites for a course
 * @return corequisites for a course
 */
export const parseCoreqs = (coreqs) => coreqs?.join(' and ');

/**
 * Append params to a base url for GET requests
 * @param {String} url the base url
 * @param {Object} params params to be appended
 * @returns the url for GET request
 */
export const appendParams = (url, params) => {
    let res = url + '?';
    const keys = Object.keys(params);
    for(const key of keys) {
        if(params.hasOwnProperty(key)) {
            res += key + '=' + params[key] + '&';
        }
    }
    return res.substring(0, res.length - 1);
}

/**
 * Parse the response from /courses/ api into course levels
 * @param {Object} courses the response from /courses/ api
 * @returns an object representing course levels and the corresponding courses
 */
export const getCourseLevels = (courses, statuses) => {
    const res = {};
    for (const course of courses) {
        course.status = statuses[[course.subject, course.number].join("")];
        const number = course.number % 10000;
        const { subject } = course;
        let courseLevel = null;
        switch (subject) {
            case "CS":
                courseLevel = ["Computer Science ", number.toString()[0], "000 Level"].join("");
                break;
            case "EECE":
                courseLevel = "Electrical & Computer Engineering";
                break;
            case "MATH":
                courseLevel = "Mathematics";
                break;
            case "DS":
                courseLevel = "Data Science";
                break;
            default:
                courseLevel = "Stats from Other Majors";
        }
        if (!res[courseLevel]) res[courseLevel] = [];
        res[courseLevel].push(course);
    }
    const keys = Object.keys(res);
    for(const key of keys) {
        res[key].sort((a, b) => a.number % 10000 - b.number % 10000);
    }
    return res;
}

/**
 * Check if prerequisites or corequisites are empty
 * @param {Array} reqs the response from API
 * @returns true if reqs is empty
 */
export const emptyReqs = (reqs) => {
    if(!reqs) return true
    if(reqs.length === 0) return true;
    if(reqs.length === 1 && (!reqs[0] || reqs[0].length === 0)) return true;
    return false;
}

/**
 * Sort selected courses of each category in ascending order
 * @param {Object} categories categories with selected courses for each category
 * @returns the sorted categories
 */
export const sortCategories = (categories) => {
    const res = {};
    Object.entries(categories).forEach(([category, courses]) => {
        const sortedCourses = [...courses];
        sortedCourses.sort(({ subject: subjectA, number: numberA }, { subject: subjectB, number: numberB }) => {
            if(subjectA.localeCompare(subjectB) !== 0) return subjectA.localeCompare(subjectB);
            return numberA.toString().localeCompare(numberB.toString());
        });
        res[category] = sortedCourses;
    });
    return res;
}
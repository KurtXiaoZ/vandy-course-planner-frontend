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
    return arr?.filter?.(x => x.length > 0)?.join(' and ');
}

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
export const getCourseLevels = (courses) => {
    const res = {};
    for(const course of courses) {
        const { number } = course;
        const courseLevel = number.toString()[0] + '000';
        if(!res[courseLevel]) res[courseLevel] = [];
        res[courseLevel].push(course);
    }
    const keys = Object.keys(res);
    for(const key of keys) {
        res[key].sort((a, b) => a.number - b.number);
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
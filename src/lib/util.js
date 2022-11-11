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
 * @return {Object} icon
 */
export const getIcon = (status) => {
    if(status === COURSE_STATUS.ABLE) return AbleIcon;
    if(status === COURSE_STATUS.NOT_ABLE) return NotAbleIcon;
    if(status === COURSE_STATUS.SELECTED) return SelectedIcon;
}

/**
 * Parse to get prerequisites for a course
 * @param {Array} prereqs prerequisites for a course
 * @return {String} prerequisites for a course
 */
export const parsePrereqs = (prereqs) => {
    const arr = prereqs.map(x => x.join(' or '));
    return arr.join(' and ');
}
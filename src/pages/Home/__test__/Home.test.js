import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Home } from '..';
import { AuthContext } from '../../../lib/contexts';
import { BrowserRouter } from 'react-router-dom';

const setUp = ({}) => {
    const utils = render(<AuthContext.Provider value={{ authName: 'name', authEmail: 'email', updateAuth: () => undefined }}>
        <BrowserRouter>
            <Home />
        </BrowserRouter>
    </AuthContext.Provider>);
    const wrapper = utils.queryByTestId('home-wrapper');
    const topNav = utils.queryByTestId('home-topnav');
    const topNavText = utils.queryByTestId('home-topnav-text');
    const couserLists = utils.queryByTestId('home-courseLists');
    const leftCourseList = utils.queryByTestId('left-courseList');
    const rightCourseList = utils.queryByTestId('right-courseList');
    const listShifter = utils.queryByTestId('list-shifter');
    const listShifterArrow = utils.queryByTestId('list-shifter-arrow');
    return {
        utils,
        wrapper,
        topNav,
        topNavText,
        couserLists,
        leftCourseList,
        rightCourseList,
        listShifter,
        listShifterArrow,
    };
}

test('Home render', async () => {
    jest.spyOn(window.screen, "width", "get").mockReturnValue(1024);
    const {
        wrapper,
        topNav,
        topNavText,
        couserLists,
        leftCourseList,
        rightCourseList,
        listShifter,
        listShifterArrow,
    } = setUp({});
    await expect(wrapper).toBeInTheDocument();
    await expect(topNav).toBeInTheDocument();
    await expect(topNavText).toBeInTheDocument();
    await expect(topNavText).toHaveTextContent('Hello, name');
    await expect(couserLists).toBeInTheDocument();
    await expect(leftCourseList).toBeInTheDocument();
    await expect(rightCourseList).toBeInTheDocument();
    await expect(listShifter).not.toBeInTheDocument();
    await expect(listShifterArrow).not.toBeInTheDocument();
});

test('Home small screen', async () => {
    jest.spyOn(window.screen, "width", "get").mockReturnValue(400);
    const {
        couserLists,
        listShifter,
        listShifterArrow,
    } = setUp({});
    await expect(couserLists).toBeInTheDocument();
    await expect(listShifter).toBeInTheDocument();
    await expect(listShifterArrow).toBeInTheDocument();
    await expect(couserLists.style.transform).toEqual('');
    await fireEvent.click(listShifterArrow);
    await expect(couserLists.scrollLeft).toEqual(360);
    await fireEvent.click(listShifterArrow);
    await expect(couserLists.scrollLeft).toEqual(0);
});
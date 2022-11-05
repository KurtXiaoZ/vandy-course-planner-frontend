import { render } from '@testing-library/react';
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
    return {
        utils,
        wrapper,
        topNav,
        topNavText,
        couserLists,
    };
}

test('Home render', async () => {
    const {
        wrapper,
        topNav,
        topNavText,
        couserLists,
    } = setUp({});
    await expect(wrapper).toBeInTheDocument();
    await expect(topNav).toBeInTheDocument();
    await expect(topNavText).toBeInTheDocument();
    await expect(topNavText).toHaveTextContent('Hello, name');
    await expect(couserLists).toBeInTheDocument();
});
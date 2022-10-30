import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { AuthPage } from '..';
import { AuthProvider } from '../../../lib/contexts';
import { BrowserRouter } from 'react-router-dom';

const setUp = ({}) => {
    globalThis.google = {
        accounts: {
            id: {
                initialize: () => undefined,
                renderButton: () => undefined
            }
        }
    };
    const utils = render(<AuthProvider>
        <BrowserRouter>
            <AuthPage />
        </BrowserRouter>
    </AuthProvider>);
    const wrapper = utils.queryByTestId('auth-page-wrapper');
    const title = utils.queryByTestId('auth-page-title');
    const iconWrapper = utils.queryByTestId('auth-page-icon-wrapper');
    const icon = utils.queryByTestId('auth-page-icon');
    const googleIcon = utils.queryByTestId('auth-page-google-button');
    return {
        utils,
        wrapper,
        title,
        iconWrapper,
        icon,
        googleIcon,
    };
}

test('AuthPage render', async () => {
    const {
        wrapper,
        title,
        iconWrapper,
        icon,
        googleIcon,
    } = setUp({});
    await expect(title).toBeInTheDocument();
    await expect(title).toHaveTextContent('Course Planner');
    await expect(wrapper).toBeInTheDocument();
    await expect(iconWrapper).toBeInTheDocument();
    await expect(icon).toBeInTheDocument();
    await expect(googleIcon).toBeInTheDocument();
});
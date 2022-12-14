/**
 * CS4287 Project
 * Author: Zechuan Xiao
 * Email: zechuan.xiao@vanderbilt.edu
 */

import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ClassHeader } from '..';
import { COURSE_STATUS, TEST_CLASS_INFO } from '../../../lib/constants';
import { AuthContext } from '../../../lib/contexts';
import { BrowserRouter } from 'react-router-dom';

const defaultClassName = 'className';
const defaultClassInfo = TEST_CLASS_INFO;
const defaultStatus = COURSE_STATUS.SELECTED;

const setUp = ({
    className = defaultClassName,
    classInfo = defaultClassInfo,
    status = defaultStatus,
}) => {
    const utils = render(<AuthContext.Provider value={{ authName: 'name', authEmail: 'email', updateAuth: () => undefined }}>
        <BrowserRouter>
            <ClassHeader 
                className={className}
                classInfo={classInfo}
                status={status}
            />
        </BrowserRouter>
    </AuthContext.Provider>);
    const header = utils.queryByTestId('class-header');
    const code = utils.queryByTestId('class-header-code');
    const name = utils.queryByTestId('class-header-name');
    const icon = utils.queryByTestId('class-header-icon');
    const draggingHeader = utils.queryByTestId('class-header-dragging');
    return {
        utils,
        header,
        code,
        name,
        icon,
        draggingHeader
    };
}

test('ClassHeader render', async () => {
    const {
        header,
        code,
        name,
        icon,
        draggingHeader,
    } = setUp({});
    await expect(header).toBeInTheDocument();
    await expect(code).toBeInTheDocument();
    await expect(name).toBeInTheDocument();
    await expect(icon).toBeInTheDocument();
    await expect(draggingHeader).not.toBeInTheDocument();
    await expect(code).toHaveTextContent(`${TEST_CLASS_INFO.subject} ${TEST_CLASS_INFO.number}`);
    await expect(name).toHaveTextContent(TEST_CLASS_INFO.name);
});
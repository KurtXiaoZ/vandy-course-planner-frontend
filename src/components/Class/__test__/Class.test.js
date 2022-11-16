import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Class } from '..';
import { COURSE_STATUS, TEST_CLASS_INFO } from '../../../lib/constants';

const defaultClassName = 'className';
const defaultOverRate = 2.7;
const defaultDiffRate = 1.9;
const defaultTid = 'https://dummy.com';

const setUp = ({
    className = defaultClassName,
    classInfo = TEST_CLASS_INFO,
    status = COURSE_STATUS.NOT_ABLE,
}) => {
    const utils = render(<Class 
        className={className}
        classInfo={classInfo}
        status={status}
    />);
    const classWrapper = utils.queryByTestId('class-wrapper');
    const classEle = utils.queryByTestId('class');
    const classCode = utils.queryByTestId('class-code');
    const classEleName = utils.queryByTestId('class-name');
    const classStatus = utils.queryByTestId('class-status');
    const classPrereqs = utils.queryByTestId('class-prereqs');
    const classCoreqs = utils.queryByTestId('class-coreqs');
    const classFrequency = utils.queryByTestId('class-frequency');
    return {
        utils,
        classWrapper,
        classEle,
        classCode,
        classEleName,
        classStatus,
        classPrereqs,
        classCoreqs,
        classFrequency
    };
}

test('Class render', async () => {
    const {
        classWrapper,
        classEle,
        classCode,
        classEleName,
        classStatus,
        classPrereqs,
        classCoreqs,
        classFrequency
    } = setUp({});
    await expect(classWrapper).toBeInTheDocument();
    await expect(classWrapper).toHaveClass(defaultClassName);
    await expect(classEle).toBeInTheDocument();
    await expect(classCode).toBeInTheDocument();
    await expect(classEleName).toBeInTheDocument();
    await expect(classStatus).toBeInTheDocument();
    await expect(classPrereqs).toBeInTheDocument();
    await expect(classCoreqs).toBeInTheDocument();
    await expect(classFrequency).toBeInTheDocument();
});
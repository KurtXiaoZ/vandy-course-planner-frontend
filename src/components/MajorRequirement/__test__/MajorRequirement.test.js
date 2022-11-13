import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MajorRequirement } from '..';
import { TEST_COMPUTER_SCIENCE_CORE } from '../../../lib/constants';

const setUp = () => {
    const utils = render(<MajorRequirement 
        {...TEST_COMPUTER_SCIENCE_CORE}
    />);
    return {
        utils,
    };
}

test('MajorRequirement render', async () => {
    const {
        utils,
    } = setUp();
    const description = utils.queryByTestId('major-requirement-description');
    const units = utils.queryByTestId('major-requirement-units');
    await expect(description).not.toBeInTheDocument();
    await expect(units).not.toBeInTheDocument();
    await expect(utils.queryByText('Programming and Problem Solving')).not.toBeInTheDocument();
    await expect(utils.queryByText('Data Structures')).not.toBeInTheDocument();
    await expect(utils.queryByText('CS 1101')).not.toBeInTheDocument();
    await expect(utils.queryByText('CS 2201')).not.toBeInTheDocument();
});

test('MajorRequirement expand', async () => {
    const {
        utils,
    } = setUp();
    await fireEvent.click(utils.queryByTestId('exandable-block-header'));
    const description = utils.queryByTestId('major-requirement-description');
    const units = utils.queryByTestId('major-requirement-units');
    await expect(description).toBeInTheDocument();
    await expect(units).toBeInTheDocument();
    await expect(utils.getByText('Programming and Problem Solving')).toBeInTheDocument();
    await expect(utils.getByText('Data Structures')).toBeInTheDocument();
    await expect(utils.getByText('CS 1101')).toBeInTheDocument();
    await expect(utils.getByText('CS 2201')).toBeInTheDocument();
});
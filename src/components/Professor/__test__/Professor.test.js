import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Professor } from '..';

const defaultName = 'ABC DEF';
const defaultOverRate = 2.7;
const defaultDiffRate = 1.9;
const defaultTid = 'https://dummy.com';

const setUp = ({
    name = defaultName,
    over_rate = defaultOverRate,
    diff_rate = defaultDiffRate,
    tid = defaultTid,
}) => {
    const utils = render(<Professor 
        name={name}
        over_rate={over_rate}
        diff_rate={diff_rate}
        tid={tid}
    />);
    const nameEle = utils.queryByTestId('professor-name');
    const overallRate = utils.queryByTestId('professor-overall-rate');
    const tidEle = utils.queryByTestId('professor-tid');
    const difficultyRate = utils.queryByTestId('professor-difficulty-rate');
    return {
        utils,
        nameEle,
        overallRate,
        tidEle,
        difficultyRate
    };
}

test('Professor render', async () => {
    const {
        nameEle,
        overallRate,
        tidEle,
        difficultyRate
    } = setUp({});
    await expect(nameEle).toBeInTheDocument();
    await expect(overallRate).toBeInTheDocument();
    await expect(tidEle).toBeInTheDocument();
    await expect(difficultyRate).toBeInTheDocument();
    await expect(nameEle).toHaveTextContent(defaultName);
    await expect(overallRate).toHaveTextContent(defaultOverRate);
    await expect(difficultyRate).toHaveTextContent(defaultDiffRate);
    await expect(tidEle).toHaveAttribute('href', defaultTid);
});
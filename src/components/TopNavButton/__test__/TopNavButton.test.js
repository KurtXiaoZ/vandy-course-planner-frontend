import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import { TopNavButton } from '..';
import DefaultIcon from './exit.svg';
import { testStyle } from '../../../lib/util';

const defaultClassName = 'className';
const defaultStyle = { color: 'red', backgroundColor: 'white' };
const defaultOnClick = () => undefined;
const defaultText = 'text';

const setUp = ({
    onClick = defaultOnClick
}) => {
    const utils = render(<TopNavButton 
        className={defaultClassName}
        style={defaultStyle}
        onClick={onClick}
        text={defaultText}
        icon={DefaultIcon}
    />);
    const wrapper = utils.queryByTestId('top-nav-button-wrapper');
    const icon = utils.queryByTestId('top-nav-button-icon');
    const text = utils.queryByTestId('top-nav-button-text');
    return {
        utils,
        wrapper,
        icon,
        text,
    };
}

test('TopNavButton render', async () => {
    const {
        wrapper,
        icon,
        text,
    } = setUp({});
    await expect(wrapper).toBeInTheDocument();
    await expect(icon).toBeInTheDocument();
    await expect(text).toBeInTheDocument();
    await expect(text).toHaveTextContent(defaultText);
    await expect(wrapper).toHaveClass(defaultClassName);
    await testStyle(wrapper, defaultStyle);
});

test('TopNavButton onClick', async () => {
    let testClick = 0;
    const onClick = () => testClick = 1;
    const {
        wrapper,
    } = setUp({ onClick });
    await expect(testClick).toEqual(0);
    await fireEvent.click(wrapper);
    await expect(testClick).toEqual(1);
});
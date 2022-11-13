import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ExpandableBlock } from '..';

const defaultClassName = 'className';
const defaultTitle = 'title';

const setUp = ({
    className = defaultClassName,
    title = defaultTitle,
    children,
}) => {
    const utils = render(<ExpandableBlock 
        className={className}
        title={title}
    >
        {children || <div data-testid='test-child'></div>}
    </ExpandableBlock>);
    const block = utils.queryByTestId('exandable-block');
    const header = utils.queryByTestId('exandable-block-header');
    const titleEle = utils.queryByTestId('exandable-block-title');
    const icon = utils.queryByTestId('exandable-block-icon');
    const content = utils.queryByTestId('exandable-block-content');
    return {
        utils,
        block,
        header,
        titleEle,
        icon,
        content
    };
}

test('ExpandableBlock render', async () => {
    const {
        utils,
        block,
        header,
        titleEle,
        icon,
        content
    } = setUp({});
    await expect(block).toBeInTheDocument();
    await expect(block).toHaveClass(defaultClassName);
    await expect(header).toBeInTheDocument();
    await expect(titleEle).toBeInTheDocument();
    await expect(titleEle).toHaveTextContent(defaultTitle);
    await expect(icon).toBeInTheDocument();
    await expect(content).not.toBeInTheDocument();
    await expect(utils.queryByTestId('test-child')).not.toBeInTheDocument();
});

test('ExpandableBlock expand', async () => {
    const {
        utils,
        header,
    } = setUp({});
    await expect(header).toBeInTheDocument();
    await fireEvent.click(header);
    await expect(utils.queryByTestId('exandable-block-content')).toBeInTheDocument();
    await expect(utils.queryByTestId('test-child')).toBeInTheDocument();
});
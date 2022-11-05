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
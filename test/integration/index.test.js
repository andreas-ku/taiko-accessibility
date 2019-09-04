const { openBrowser, closeBrowser, goto, accessibility } = require('taiko');

beforeEach(async () => {
    await openBrowser();
});

afterEach(async () => {
    await closeBrowser();
});

describe('index', () => {
    it('should integrate with Axe Core and Taiko', async () => {
        jest.setTimeout(20000);

        await goto('https://taiko.gauge.org');
        const violations = await accessibility.runAudit();

        expect(violations).toBeDefined();
    });
});


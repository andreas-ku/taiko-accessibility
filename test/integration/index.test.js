const { openBrowser, closeBrowser, goto, accessibility } = require('taiko');

beforeEach(async () => {
    await openBrowser();
});

afterEach(async () => {
    await closeBrowser();
});

describe('index', () => {
    it('should integrate with Axe Core and Taiko', async () => {
        jest.setTimeout(30000);
        await goto('https://taiko.gauge.org');
        const audit = await accessibility.audit();
        expect(audit).toBe(42);
    });
});


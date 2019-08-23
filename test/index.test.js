const { openBrowser, closeBrowser, goto, accessibility } = require('taiko');

beforeEach(async () => {
    await openBrowser();
});

afterEach(async () => {
    await closeBrowser();
});

test('should integrate with Axe Core and Taiko', async () => {
    await goto('https://taiko.gauge.org/');
    const audit = await accessibility.audit();
    expect(audit.violations.length).toBeDefined();
});

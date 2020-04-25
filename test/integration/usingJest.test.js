const { openBrowser, closeBrowser, goto, evaluate, accessibility } = require('taiko');

beforeEach(async () => {
    await openBrowser({headless: false});
});

afterEach(async () => {
    await closeBrowser();
});

describe('index', () => {
    it('integrates with Axe Core and Taiko', async () => {
        await goto('https://taiko.gauge.org');

        const result = await accessibility.runAudit();

        expect(result.score).toEqual(expect.any(Number));
        expect(result.violations).toEqual(expect.any(Array));
    });

    it('returns 0 violations for a page that has 0 violations using the Axe Chrome extension', async () => {
        await goto('https://wave.webaim.org/extension');

        const audit = await accessibility.runAudit();

        expect(audit.violations.length).toEqual(0);
    });

    it('returns 1 violation if adding a violation to a page with 0 violations', async () => {
        await goto('https://wave.webaim.org/extension');
        await evaluate(document => {
            const image = document.querySelector('img[alt="WAVE Extension"]');
            image.removeAttribute('alt');
        });

        const audit = await accessibility.runAudit();

        expect(audit.violations.length).toEqual(1);
        expect(audit.violations[0].description).toEqual('Ensures <img> elements have alternate text or a role of none or presentation');
    });
});


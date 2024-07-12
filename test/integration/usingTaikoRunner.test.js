const {accessibility, openBrowser, goto, closeBrowser} = require('taiko');
const { expect } = require('expect');

(async () => {
    try {
        await openBrowser();
        await goto('https://taiko.dev');

        const result = await accessibility.runAudit();

        expect(result.score).toEqual(expect.any(Number));
        expect(result.violations).toEqual(expect.any(Array));
    } catch (error) {
        console.log(error);
        process.exitCode = 1;
    } finally {
        closeBrowser();
    }
})();
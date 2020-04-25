# Taiko Accessibility Plugin

A plugin to perform accessibility testing with [Taiko](https://github.com/getgauge/taiko).
For now, the plugin is utilizing the Axe Core library (https://github.com/dequelabs/axe-core). 

## Install

```
npm install --save-dev taiko-accessibility
```

## Example

```bash
  npm init -y
  npm install --save-dev taiko taiko-accessibility jest
```

Add this test in a file `accessibility.test.js`.

```js

const { accessibility, closeBrowser, goto, openBrowser } = require('taiko');

describe('accessibility', () => {

    beforeEach(async () => {
        await openBrowser();
    });
    
    afterEach(async () => {
        await closeBrowser();
    });
    
    test('Should be accessible', async () => {
        jest.setTimeout(20000);

        await goto('https://taiko.gauge.org');
        const audit = await accessibility.runAudit();

        expect(audit.violations.length).toEqual(0);
    });

});

```

Run script with:
```
jest accessibility.test.js 
```

Or if Jest in not installed globally:
```
./node_modules/jest/bin/jest.js accessibility.test.js 
```

## API

runAudit() currently returns an object with the following keys:

### `score`

A score between 0-100 which shows how well the page is doing in terms of accessibility. This is based on the ration of fulfilled rules to applied rules (100 is best, 0 worst).

### `violations`

An array with detailed information of the accessibility violations.

## License

MIT
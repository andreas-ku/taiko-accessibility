# Taiko Accessibility Plugin

A plugin to perform accessibility testing with [Taiko](https://github.com/getgauge/taiko).
For now, the plugin is utilizing the Axe Core library (https://github.com/dequelabs/axe-core). 

## Install

```
npm install --save-dev taiko-accessibility
```

## Example

```bash
  npm install --save-dev taiko taiko-accessibility jest
```

Add this test in a file `accessibility.test.js`.

```js

const { accessibility, closeBrowser, goto, openBrowser } = require('taiko');

beforeEach(async () => {
    await openBrowser();
});

afterEach(async () => {
    await closeBrowser();
});

test('Should be accessible', async () => {
    jest.setTimeout(30000);
    await goto('https://taiko.gauge.org/');
    const audit = await accessibility.audit();
    expect(audit.violations).toEqual([]);
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

## License

MIT
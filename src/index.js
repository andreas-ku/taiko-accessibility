const fs = require('fs');
const calculateScore = require('./calculateScore');

let _runtime;

const init = (taiko, eventHandler) => {
    eventHandler.on('createdSession', async (client) => {
        _runtime = client.Runtime;
    });
};

const injectAxe = async () => {
    const script = fs.readFileSync('node_modules/axe-core/axe.min.js', 'utf8');
    await _runtime.evaluate({expression: script, awaitPromise: true});
};

const runAudit = async () => {
    await injectAxe();
    const response = await _runtime.evaluate({expression: '{testResult: axe.run({resultTypes: ["violations"]})}', awaitPromise: true, returnByValue: true});
    const result = response.result.value;

    return {
        score: calculateScore(result.passes, result.violations),
        violations: result.violations
    };
};

module.exports = {
    init,
    runAudit
};

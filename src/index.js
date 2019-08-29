const axe = require('axe-core');

let _dom;

const runAxe = (node) => new Promise((fullfill, reject) => {
    const options = {
        "resultTypes": ["violations"]
    }
    axe.run(node, options,(error, result) => {
        if (error) {
            reject(error);
        }
        fullfill(result);
    });
});

exports.init = (taiko, eventHandler) => {
    eventHandler.on('createdSession', async (client) => {
        _dom = client.DOM;
    });
};

exports.runAudit = async () => {
    const rootNode = await _dom.getDocument({depth: -1});
    const pageSource = await _dom.getOuterHTML({
        nodeId: rootNode.root.nodeId,
    });
    const outerHtml = pageSource.outerHTML;
    const parser = new DOMParser(); // eslint-disable-line
    const parsedHtml = parser.parseFromString(outerHtml, 'text/html');
    const testResult = await runAxe(parsedHtml);
    return testResult.violations;
};
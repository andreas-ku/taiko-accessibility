const axe = require('axe-core');

let _dom;

exports.init = (taiko, eventHandler) => {
  eventHandler.on('createdSession', async (client) => {
    _dom = client.DOM;
  });
};

const runAxe = (node) => new Promise((fullfill, reject) => {
  axe.run(node, (error, result) => {
    if (error) {
      reject(error);
    }
    fullfill(result);
  });
});

exports.audit = async () => {
  const rootNode = await _dom.getDocument({ depth: -1 });
  const outerHtml = await _dom.getOuterHTML({
    nodeId: rootNode.root.nodeId,
  });
  const parser = new DOMParser(); // eslint-disable-line
  const parsedHtml = parser.parseFromString(outerHtml, 'text/html');
  return await runAxe(parsedHtml);
};

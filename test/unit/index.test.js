const {EventEmitter} = require('events');
const taiko = require('taiko');
const {init, audit} = require('../../src');
const {html: testHtml0Violations} = require('./data/0_violations');
const {html: testHtml1Violation} = require('./data/1_violation');

describe('index', () => {

    const mockTestHtml = (testData) => {
        const eventEmitter = new EventEmitter();
        init(taiko, eventEmitter);
        eventEmitter.emit('createdSession', {
            DOM: {
                getDocument: () => ({
                    root: {nodeId: 'some node id'}
                }),
                getOuterHTML: () => ({
                    outerHTML: testData
                })
            }
        })
    };

    it('should not return any violations for a page that follows WCAG', async () => {
        mockTestHtml(testHtml0Violations);

        const result = await audit();

        expect(result.violations.length).toEqual(0);
    });

    it('should return violations of WCAG (example: missing alt tag of image)', async () => {
        mockTestHtml(testHtml1Violation);

        const result = await audit();

        expect(result.violations.length).toEqual(1);
        expect(result.violations[0].description).toEqual('Ensures <img> elements have alternate text or a role of none or presentation');
    });
});
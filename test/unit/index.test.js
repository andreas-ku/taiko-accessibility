const {EventEmitter} = require('events');
const taiko = require('taiko');
const {init, runAudit} = require('../../src');
const {html: testHtml0Violations} = require('./data/0_violations');
const {html: testHtml1Violation} = require('./data/1_violation');

jest.mock('../../src/calculateScore', () => jest.fn());
const calculateScore = require('../../src/calculateScore');

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

    describe('violations', () => {
        it('should not return any violations for a page that follows WCAG', async () => {
            mockTestHtml(testHtml0Violations);

            const audit = await runAudit();

            expect(audit.violations.length).toEqual(0);
        });

        it('should return violations of WCAG (example: missing alt tag of image)', async () => {
            mockTestHtml(testHtml1Violation);

            const audit = await runAudit();

            expect(audit.violations.length).toEqual(1);
            expect(audit.violations[0].description).toEqual('Ensures <img> elements have alternate text or a role of none or presentation');
        });
    });

    describe('score', () => {
        it('should return the result of the calculateScore function as score', async () => {
            calculateScore.mockImplementation(() => 42);
            mockTestHtml(testHtml0Violations);

            const audit = await runAudit();

            expect(audit.score).toEqual(42);
        });
    })

});
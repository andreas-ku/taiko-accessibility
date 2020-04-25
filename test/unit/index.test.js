const {EventEmitter} = require('events');
const taiko = require('taiko');
const fs = require('fs');
const {init, runAudit} = require('../../src');

jest.mock('../../src/calculateScore', () => jest.fn());
const calculateScore = require('../../src/calculateScore');
const evaluateMock = jest.fn();

describe('index', () => {

    const mockRuntime = (passingRules, violatedRules) => {
        const eventEmitter = new EventEmitter();
        init(taiko, eventEmitter);
        evaluateMock.mockReturnValue({
            result: {
                value: {
                    passes: passingRules,
                    violations: violatedRules
                }
            }
        });
        eventEmitter.emit('createdSession', {
            Runtime: {
                evaluate: evaluateMock
            }
        })
    };

    beforeEach(() => {
        jest.resetAllMocks();
    });

    describe('violations', () => {
        it('returns number of violated rules based on response from Axe Core', async () => {
            mockRuntime([], ['some violated rule']);

            const audit = await runAudit();

            expect(audit.violations.length).toEqual(1);
        });
    });

    describe('score', () => {
        it('returns the result of the calculateScore function as score', async () => {
            calculateScore.mockImplementation(() => 42);
            mockRuntime(['some passing rule'], ['some violated rule']);

            const audit = await runAudit();

            expect(calculateScore).toHaveBeenCalledWith(['some passing rule'], ['some violated rule']);
            expect(audit.score).toEqual(42);
        });
    });

    describe('Axe Core executions', () => {
        it('calls the evaluate mock twice to inject the Axe Core script and to run the audit', async () => {
            mockRuntime([], []);

            await runAudit();

            expect(evaluateMock).toHaveBeenCalledTimes(2);
        });

        it('injects the script first', async () => {
            mockRuntime([], []);
            const expectedScript = fs.readFileSync('node_modules/axe-core/axe.min.js', 'utf8');

            await runAudit();

            const argument = evaluateMock.mock.calls[0][0];
            expect(argument.expression).toEqual(expectedScript);
        });

        it('then the runs axe and filters for violations', async () => {
            mockRuntime([], []);

            await runAudit();

            const argument = evaluateMock.mock.calls[1][0];
            expect(argument.expression).toContain('axe.run({resultTypes: ["violations"]})');
        });
    });

});
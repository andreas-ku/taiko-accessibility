const calculateScore = require("../../src/calculateScore");

describe('calculateScore', () => {

    it('should return 100 if all rules are passing', () => {
        const score = calculateScore(["some rule", "another rule"], []);
        expect(score).toEqual(100);
    });

    it('should return 100 if zero rules apply', () => {
        const score = calculateScore([], []);
        expect(score).toEqual(100);
    });

    it('should return 0 if all rules are violated', () => {
        const score = calculateScore([], ['some rule', 'another rule']);
        expect(score).toEqual(0);
    });

    it('should round down if digits behind comma are < .5', () => {
        const score = calculateScore(['a passing rule'], ['some rule', 'another rule']);
        expect(score).toEqual(33);
    });

    it('should round down if digits behind comma are > .5', () => {
        const score = calculateScore(['a passing rule', 'another passing rule'], ['some rule']);
        expect(score).toEqual(67);
    });

});
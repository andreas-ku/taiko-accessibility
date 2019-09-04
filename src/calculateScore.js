const calculateScore = (passingRules, violatedRules) => {
    const numberOfPassingRules = passingRules.length;
    const numberOfAppliedRules = passingRules.length + violatedRules.length;
    if (numberOfAppliedRules === 0) {
        return 100;
    }
    const score = numberOfPassingRules / numberOfAppliedRules * 100;
    return Math.round(score);
};

module.exports = calculateScore;
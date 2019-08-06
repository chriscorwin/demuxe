// Sorts an array alphanumerically, so that '10.svg' comes after '2.svg' in our lists of steps.
module.exports = (a, b) => a.localeCompare(b, 'en', { numeric: true });

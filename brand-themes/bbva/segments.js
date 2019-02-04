segments = require('../../demo-overrides/dmp/df18keynote/segments');

// Segments is pass by reference, therefore changing it in the `initial` object _also_ changes the
// reference to it in addHighValue object.
segments.states.initial.segments[3].title = 'Crocs Club customer and Purchase last 90 days';

module.exports = segments;
const date = new Date();
const y = date.getFullYear();
const m = date.getMonth();
const firstDay = new Date(y, m, 1);
const firstDayLastMonth = new Date(y, m - 1, 1);
const lastDayLastMonth = new Date(y, m, 0);


const monthDay = { month: 'short', day: 'numeric' };
const monthDayYear = { year: 'numeric', month: 'short', day: 'numeric' };
const terse = { month: 'numeric', day: 'numeric' };

const today = date.toLocaleDateString("en-US", monthDayYear)
const firstOfMonth = firstDay.toLocaleDateString("en-US", monthDay);
const firstOfLastMonth = firstDayLastMonth.toLocaleDateString("en-US", monthDay);
const lastOfLastMonth = lastDayLastMonth.toLocaleDateString("en-US", monthDayYear);

const todayTerse = date.toLocaleDateString("en-US", terse);
const twoWeeksAgoTerse = new Date(Date.now() - 12096e5).toLocaleDateString("en-US", terse);
const oneMonthAgoTerse = new Date(Date.now() - 12096e5 - 12096e5).toLocaleDateString("en-US", terse);

module.exports = {
	today,
	firstOfMonth,
	firstOfLastMonth,
	lastOfLastMonth,
	todayTerse,
	twoWeeksAgoTerse,
	oneMonthAgoTerse
};

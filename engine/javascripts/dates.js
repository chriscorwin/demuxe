const FORTNIGHT = 12096e5;

const FORMATS = {
	monthShort: { month: 'short' },
	monthDayFormat: { month: 'short', day: 'numeric' },
	monthDayYear: { year: 'numeric', month: 'short', day: 'numeric' },
	terse: { month: 'numeric', day: 'numeric' },
	terseWithYear: { month: 'numeric', day: 'numeric', year: 'numeric' }
};

const date = new Date();
const y = date.getFullYear();
const m = date.getMonth();
const d = date.getDay();
const DATES = {
	now: date,
	twoWeeksAgo: new Date(Date.now() - FORTNIGHT),
	fourWeeksAgo: new Date(Date.now() - FORTNIGHT - FORTNIGHT),
	oneMonthAgo: new Date(y, m - 1, d),
	twoMonthsAgo: new Date(y, m - 2, d),
	threeMonthsAgo: new Date(y, m - 3, d),
	fourMonthsAgo: new Date(y, m - 4, d),
	oneYearAgo: new Date(y - 1, m, d),
	aboutOneMonthAgo: new Date(y, m - 1, '5'),
	aboutTwoMonthsAgo: new Date(y, m - 2, '17'),
	aboutThreeMonthsAgo: new Date(y, m - 3, '12'),
	aboutFourMonthsAgo: new Date(y, m - 4, '26'),
	firstDayThisMonth: new Date(y, m, 1),
	firstDayLastMonth: new Date(y, m - 1, 1),
	lastDayLastMonth: new Date(y, m, 0)
};

const today = DATES.now.toLocaleDateString("en-US", FORMATS.monthDayYear);
const firstOfMonth = DATES.firstDayThisMonth.toLocaleDateString("en-US", FORMATS.monthDay);
const firstOfLastMonth = DATES.firstDayLastMonth.toLocaleDateString("en-US", FORMATS.monthDay);
const lastOfLastMonth = DATES.lastDayLastMonth.toLocaleDateString("en-US", FORMATS.monthDayYear);

const oneMonthAgo = DATES.oneMonthAgo.toLocaleDateString("en-US", FORMATS.monthDayYear);
const twoMonthsAgo = DATES.twoMonthsAgo.toLocaleDateString("en-US", FORMATS.monthDayYear);
const threeMonthsAgo = DATES.threeMonthsAgo.toLocaleDateString("en-US", FORMATS.monthDayYear);
const fourMonthsAgo = DATES.fourMonthsAgo.toLocaleDateString("en-US", FORMATS.monthDayYear);
const oneYearAgo = DATES.oneYearAgo.toLocaleDateString("en-US", FORMATS.monthDayYear);

const aboutOneMonthAgo = DATES.aboutOneMonthAgo.toLocaleDateString("en-US", FORMATS.monthDayYear);
const aboutTwoMonthsAgo = DATES.aboutTwoMonthsAgo.toLocaleDateString("en-US", FORMATS.monthDayYear);
const aboutThreeMonthsAgo = DATES.aboutThreeMonthsAgo.toLocaleDateString("en-US", FORMATS.monthDayYear);
const aboutFourMonthsAgo = DATES.aboutFourMonthsAgo.toLocaleDateString("en-US", FORMATS.monthDayYear);


const todayTerse = DATES.now.toLocaleDateString("en-US", FORMATS.terse);
const twoWeeksAgoTerse = DATES.twoWeeksAgo.toLocaleDateString("en-US", FORMATS.terse);
const oneMonthAgoTerse = DATES.fourWeeksAgo.toLocaleDateString("en-US", FORMATS.terse);

const fourMonthsAgoTerseWithYear = DATES.fourMonthsAgo.toLocaleDateString("en-US", FORMATS.terseWithYear);

module.exports = {
	today,
	firstOfMonth,
	firstOfLastMonth,
	lastOfLastMonth,
	oneMonthAgo,
	twoMonthsAgo,
	threeMonthsAgo,
	fourMonthsAgo,
	oneYearAgo,
	aboutOneMonthAgo,
	aboutTwoMonthsAgo,
	aboutThreeMonthsAgo,
	aboutFourMonthsAgo,
	todayTerse,
	twoWeeksAgoTerse,
	oneMonthAgoTerse,
	fourMonthsAgoTerseWithYear,
	thisMonthShort: DATES.now.toLocaleDateString("en-US", FORMATS.monthShort),
	oneMonthAgoShort: DATES.oneMonthAgo.toLocaleDateString("en-US", FORMATS.monthShort),
	twoMonthsAgoShort: DATES.twoMonthsAgo.toLocaleDateString("en-US", FORMATS.monthShort),
	threeMonthsAgoShort: DATES.threeMonthsAgo.toLocaleDateString("en-US", FORMATS.monthShort),
	fourMonthsAgoShort: DATES.fourMonthsAgo.toLocaleDateString("en-US", FORMATS.monthShort),
	DATES,
	FORMATS
};

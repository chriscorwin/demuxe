const FORTNIGHT = 12096e5;
const ONEWEEK = 604800000;

const FORMATS = {
	monthShort: { month: 'short' },
	monthDay: { month: 'short', day: '2-digit' },
	monthDayYear: { year: 'numeric', month: 'short', day: '2-digit' },
	terse: { month: '2-digit', day: '2-digit' },
	terseWithYear: { month: '2-digit', day: '2-digit', year: 'numeric' }
};

const date = new Date();
const y = date.getFullYear();
const m = date.getMonth();
const d = date.getDay();
const DATES = {
	now: date,
	oneWeekAgo: new Date(Date.now() - ONEWEEK),
	twoWeeksAgo: new Date(Date.now() - FORTNIGHT),
	threeWeeksAgo: new Date(Date.now() - FORTNIGHT - ONEWEEK),
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
const oneWeekAgoTerse = DATES.oneWeekAgo.toLocaleDateString("en-US", FORMATS.terse);
const twoWeeksAgoTerse = DATES.twoWeeksAgo.toLocaleDateString("en-US", FORMATS.terse);
const threeWeeksAgoTerse = DATES.threeWeeksAgo.toLocaleDateString("en-US", FORMATS.terse);
const oneMonthAgoTerse = DATES.fourWeeksAgo.toLocaleDateString("en-US", FORMATS.terse);

const todayTerseWithYear = DATES.now.toLocaleDateString("en-US", FORMATS.terseWithYear);
const oneWeekAgoTerseWithYear = DATES.oneWeekAgo.toLocaleDateString("en-US", FORMATS.terseWithYear);
const twoWeeksAgoTerseWithYear = DATES.twoWeeksAgo.toLocaleDateString("en-US", FORMATS.terseWithYear);
const threeWeeksAgoTerseWithYear = DATES.threeWeeksAgo.toLocaleDateString("en-US", FORMATS.terseWithYear);
const oneMonthAgoTerseWithYear = DATES.fourWeeksAgo.toLocaleDateString("en-US", FORMATS.terseWithYear);
const fourMonthsAgoTerseWithYear = DATES.fourMonthsAgo.toLocaleDateString("en-US", FORMATS.terseWithYear);

// All examples below assume today is Mar 02 2019
module.exports = {
	today, // Mar 02 2019
	firstOfMonth, // Mar 02
	firstOfLastMonth, // Feb 02
	lastOfLastMonth, // Feb 28 2019
	oneMonthAgo,// Feb 02 2019
	twoMonthsAgo, // Jan 02 2019
	threeMonthsAgo, // Dec 02 2019
	fourMonthsAgo, // Nov 02 2019
	oneYearAgo, // Mar 02 2018
	aboutOneMonthAgo, // Feb 05 2019
	aboutTwoMonthsAgo, // Jan 17 2019
	aboutThreeMonthsAgo, // Dec 12 2019
	aboutFourMonthsAgo, // Nov 26 2019
	todayTerse, // 03/02
	oneWeekAgoTerse, // 02/23
	twoWeeksAgoTerse, // 02/16
	threeWeeksAgoTerse, // 02/09
	oneMonthAgoTerse, // 02/02
	todayTerseWithYear, // 03/02/2019
	oneWeekAgoTerseWithYear, // 02/23/2019
	twoWeeksAgoTerseWithYear, // 02/16/2019
	threeWeeksAgoTerseWithYear, // 02/09/2019
	oneMonthAgoTerseWithYear, // 02/02/2019
	fourMonthsAgoTerseWithYear, // 12/02/2018
	thisMonthShort: DATES.now.toLocaleDateString("en-US", FORMATS.monthShort), // Mar
	oneMonthAgoShort: DATES.oneMonthAgo.toLocaleDateString("en-US", FORMATS.monthShort), // Feb
	twoMonthsAgoShort: DATES.twoMonthsAgo.toLocaleDateString("en-US", FORMATS.monthShort), // Jan
	threeMonthsAgoShort: DATES.threeMonthsAgo.toLocaleDateString("en-US", FORMATS.monthShort), // Dec
	fourMonthsAgoShort: DATES.fourMonthsAgo.toLocaleDateString("en-US", FORMATS.monthShort), // Nov
	DATES,
	FORMATS
};

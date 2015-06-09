function Day(date, desc) {

    if (typeof date === 'undefined') {
        date = "On that year";
    }
    this.date = date;

    this.desc = desc;
    this.rank = 0;

    var reg = "(?:January|February|March|April|May|June|July|August|September|October|November|December?) ([1-9]|[12]\d|3[01])";
    if (this.date.match(reg)) {
        this.srank = parseInt(this.date.split(" ")[1]);
    } else {
        this.srank = parseInt(this.date);
    }

    if (date.indexOf("janvier") > -1 || date.indexOf("January") > -1) {
        this.rank = 1;
    } else if (date.indexOf("février") > -1 || date.indexOf("February") > -1) {
        this.rank = 2;
    } else if (date.indexOf("mars") > -1 || date.indexOf("March") > -1) {
        this.rank = 3;
    } else if (date.indexOf("avril") > -1 || date.indexOf("April") > -1) {
        this.rank = 4;
    } else if (date.indexOf("mai") > -1 || date.indexOf("May") > -1) {
        this.rank = 5;
    } else if (date.indexOf("juin") > -1 || date.indexOf("June") > -1) {
        this.rank = 6;
    } else if (date.indexOf("juillet") > -1 || date.indexOf("July") > -1) {
        this.rank = 7;
    } else if (date.indexOf("août") > -1 || date.indexOf("August") > -1) {
        this.rank = 8;
    } else if (date.indexOf("septembre") > -1 || date.indexOf("September") > -1) {
        this.rank = 9;
    } else if (date.indexOf("octobre") > -1 || date.indexOf("October") > -1) {
        this.rank = 10;
    } else if (date.indexOf("novembre") > -1 || date.indexOf("November") > -1) {
        this.rank = 11;
    } else if (date.indexOf("décembre") > -1 || date.indexOf("December") > -1) {
        this.rank = 12;
    }

    this.getRank = function () {
        return this.rank;
    };
    this.getSRank = function () {
        return this.srank;
    };
}



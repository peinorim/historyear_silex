function Year(num) {
    this.num = num;
    this.events = new Array();

    this.addEvent = function (date, desc) {
        var day = new Day(date, desc);
        this.events.push(day);
    };

    this.getEvents = function () {
        this.events.sort(function (a, b) {
            if (a.getRank() !== b.getRank()) {
                return a.getRank() - b.getRank();
            } 
            return a.getSRank() - b.getSRank();
        });
        return this.events;
    };
}



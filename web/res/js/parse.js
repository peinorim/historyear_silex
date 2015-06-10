var clock, countup;
var $timeline_block = null;
$(window).on('resize load', function () {
    $('body').css({"padding-top": $(".navbar").height() + "px"});
});
$(document).ready(function () {
    if ($("#cd-timeline").attr("data-year") !== "") {
        var year = $("#cd-timeline").attr("data-year");
    } else {
        var d = new Date();
        var year = d.getFullYear();
    }
    clock = new FlipClock($('.clock'), year, {
        clockFace: 'Counter'
    });

    parse(year, $("html").attr("lang"));

    $("#btn").click(function () {
        goYear();
    });
    $("#year").keydown(function (e) {
        if (e.which === 13) {
            goYear();
        }
    });
});
function goYear() {
    var year = parseInt($("#year").val());
    if (!isNaN(year)) {
        countup = setInterval(function () {
            $("#cd-timeline").html("");
            if (clock.getTime().time === year) {
                clock.stop();
                clearInterval(countup);
                parse(parseInt(year), $("html").attr("lang"));
            } else if (clock.getTime().time < year) {
                clock.increment();
            } else if (clock.getTime().time > year) {
                clock.decrement();
            }
        }, 0.1);
    }
}

function parse(year_num, locale) {
    locale = typeof locale !== 'undefined' ? locale : "en";
    $.getJSON('http://' + locale + '.wikipedia.org/w/api.php?action=parse&page=' + year_num + '&format=json&prop=text&callback=?', function (data) {
        var html = data.parse.text['*'];
        if (locale === "fr") {
            var sep = ":";
            var reg = "([1-9]|[12]\d|3[01])(er)? (?:janvier|février|mars|avril|mai|juin|juillet|août|septembre|octobre|novembre|décembre?)";
        } else {
            var sep = "–";
            var reg = "(?:January|February|March|April|May|June|July|August|September|October|November|December?) ([1-9]|[12]\d|3[01])";
        }
        var dom = document.implementation.createHTMLDocument("temp");
        var jq = jQuery(dom);
        jq.find('html').append(html);
        var ul = jq.find('.mw-headline:first').parent(':first').nextAll("ul");
        var year = new Year(year_num);

        ul.each(function (index) {
            $(this).children().each(function (index) {
                if ($(this).children("ul").length) {
                    var day = $(this).text();
                    if (day.match(reg)) {
                        var sslis = new Array();
                        $(this).children("ul").children("li").each(function (ssind) {
                            sslis.push(capitaliseFirstLetter($(this).text().replace(/ *\[[^)]*\] */g, "")));
                        });
                        if (locale !== "fr") {
                            year.addEvent($(this).children("a:first").attr("title"), sslis);
                        } else {
                            year.addEvent(day.split(sep)[0], sslis);
                        }
                    }
                } else {
                    if ($(this).text().indexOf(sep) > -1) {
                        var event = $(this).text().split(sep);
                        var day = event[0];
                        if (day.match(reg)) {
                            event.shift();
                            var desc = capitaliseFirstLetter(event.toString().replace(" ", "").replace(/ *\[[^)]*\] */g, ""));
                            year.addEvent(day, desc);
                        }
                    }
                }
            });
        });
        var html = "";
        for (var i = 0; i < year.getEvents().length; i++) {
            var day = year.getEvents()[i];
            html += '<div class="cd-timeline-block">\n\
                            <div class="cd-timeline-img cd-picture">\n\
                                <i class="fa fa-calendar"></i>\n\
                            </div> <div class="cd-timeline-content">';
            if (typeof day.desc !== 'string') {
                for (var j in day.desc) {
                    html += '<a target="_blank" href="http://www.google.com/search?q=' + day.desc[j] + '"><h3>' + day.desc[j] + '</h3></a>';
                }
            } else {
                html += '<a target="_blank" href="http://www.google.com/search?q=' + day.desc + '"><h3>' + day.desc + '</h3></a>';
            }
            html += '<span class="cd-date"><h2>' + day.date + '</h2></span></div></div>';
        }
        $("#cd-timeline").html(html);

    });
}

function capitaliseFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


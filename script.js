var currentDayEL = document.querySelector("#currentDay");
currentDayEL.textContent = moment().format('dddd, MMM Do');  

// determine current hour
var currentHour = moment().format('HH');
// console.log(currentHour);

// loop through all class time-block
for (i = 9; i < 18; i++) {

    var hourId = '#hour-' + i
    // console.log('hourId: ' + hourId);
    var hourBlock = document.querySelector(hourId);
    //console.log(hourBlock);

    if (i < currentHour) {
        hourBlock.classList = "row time-block past";
    }
    else if (i == currentHour) {
        hourBlock.classList = "row time-block present";
    }
    else if (i > currentHour) {
        hourBlock.classList = "row time-block future";
    }

}

$('.btn').click( function() {

    var parentID = $(this).parent().attr("id");
    // console.log(parentID);
    var entry = ''

    // loop  child of parentID for textarea  with class = description
    $('#' + parentID).children('.description')
        .each(function () {
             entry = $(this).val().trim();
        });

    // console.log(parentID + ', ' + entry);
    var hourId = parentID.replace("hour-", "");
    saveCalendarEvent(hourId, entry);
});

function saveCalendarEvent(hourId, calendarEntry) {
    var retrievedCalendarEvents = JSON.parse(localStorage.getItem('workdayscheduler')) || [];
    if (retrievedCalendarEvents === null) {
        retrievedCalendarEvents = [];
    }
    var newCalendarEntry = {hour: hourId, entry: calendarEntry};
    const index = retrievedCalendarEvents.findIndex((e) => e.hour === hourId);

    if (index === -1) {
        retrievedCalendarEvents.push(newCalendarEntry);
    }
    else {
        retrievedCalendarEvents.splice(index, 1, newCalendarEntry);
    };
    // console.log(retrievedCalendarEvents);
    localStorage.setItem("workdayscheduler",  JSON.stringify(retrievedCalendarEvents));
}

function loadCalendarEvents() {
    var retrievedCalendarEvents = JSON.parse(localStorage.getItem('workdayscheduler'));
    if (retrievedCalendarEvents === null) {
        retrievedCalendarEvents = [];
    }
    else {
        for (var i = 0; i < retrievedCalendarEvents.length; i++) {
            var currentTime = retrievedCalendarEvents[i];
            // console.log(currentTime);

            // currentTime {hour: value, entry: value}
            var hour = '#hour-' + currentTime.hour;
            var entry = currentTime.entry;
            // console.log(hour, entry);
            
            var hourEL = document.querySelector(hour);
            $(hourEL).children('.description')
            .each(function () {
                // console.log($(this));
                var textAreaEL = $(this);
                textAreaEL.val(entry);
            });
        }
    }
};

loadCalendarEvents();
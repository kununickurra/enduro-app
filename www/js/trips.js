$(document).ready(function () {
    $("#trip-page").bind('pagebeforeshow', function () {
        loadTrips();
    });
});

function loadTrips() {
    var tripService = new TripService();
    tripService.getAllTripIds(function (tripsIds) {
        $("#input-select-trips").empty();
        for (i = 0; i < tripsIds.length; i++) {
            $("<option></option>").text(tripsIds[i].trip_id).val(tripsIds[i].trip_id).appendTo($("#input-select-trips"));
        }
    });
}

function loadTripData() {
    var tripService = new TripService();
}


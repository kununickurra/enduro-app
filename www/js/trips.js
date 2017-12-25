$(document).ready(function () {
    $("#trip-page").bind('pagebeforeshow', function () {
        loadTrips();
    });

    $("#input-select-trips").change(function () {
        loadTripData($(this).find('option:selected').val());
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

function loadTripData(tripId) {
    var tripService = new TripService();
    tripService.getTripLogs(tripId, function (tripLogs) {
        var latLng = new google.maps.LatLng(tripLogs[0].latitude, tripLogs[0].longitude);
        showMap(latLng, document.getElementById('trips-map-container'))
        var path = [];
        for (i = 0; i < tripLogs.length; i++) {
            path.push(new google.maps.LatLng(tripLogs[i].latitude, tripLogs[i].longitude));
        }
        drawLine(path);
    });
}


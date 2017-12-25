var _tracking_interval_id = null;
var _current_refresh_interval = null;
var _current_trip_id = null;
var _last_position = null;
var _map = null;

// Initialize elements when received the 'deviceready' event from cordova.
$(document).on('deviceready', function () {

});

$(document).ready(function () {


    $("#btn-show-map").click(function(event) {
        if(_last_position!=null) {
            var latLng = new google.maps.LatLng(_last_position.coords.latitude, _last_position.coords.longitude);
            showMap(latLng, document.getElementById('map-container'));
            createMarkerForHome(_last_position);
        }
    });

    $("#btn-add-marker").click(function(event) {
        if(_last_position!=null && _map!=null) {
            createMarkerForHome(_last_position);
        }
    });

    $("#btn-start-tracking").click(function(event) {
        _current_refresh_interval =  $("#input-interval").val();
        _current_trip_id = $("#input-trip-id").val()
        if(_tracking_interval_id == null) {
            getCurrentPosition();
            _tracking_interval_id = setInterval(getCurrentPosition,  _current_refresh_interval)
        }
    });

    $("#btn-stop-tracking").click(function(event) {
        if(_tracking_interval_id != null) {
            clearInterval(_tracking_interval_id);
            _tracking_interval_id = null;
        }
    });

    $(document).on('geolocalized', function(event, type, data) {
        $("#text-location").text("Longitude: "+ data.coords.latitude +" , Latitude" + data.coords.longitude);
        var tripService = new TripService();
        console.log("Recording log for position : Longitude: "+ data.coords.latitude +" , Latitude" + data.coords.longitude);
        tripService.recordTripLog({
            tripId : _current_trip_id,
            latitude :  data.coords.latitude,
            longitude :  data.coords.longitude,
        });
    });

})

function getCurrentPosition() {
    if(!navigator.geolocation) {
        alert("Golocation API not supported", "Error");
        return;
    }

    navigator.geolocation.getCurrentPosition(
        function(position) {
            _last_position = position;
            $(document).trigger('geolocalized', ['current-position', position]);
        },
        function() {
            alert("Golocation API not supported", "Error");
        },
        { enableHighAccuracy: true });
    return false;
}

function showMap(position, container) {
    var mapOptions = {
        center: position,
        // center: new google.maps.LatLng(coords.coords.latitude, coords.coords.longitude),
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    _map = new google.maps.Map(container, mapOptions);
    Infowindow = new google.maps.InfoWindow();
    // var otherPoint = new google.maps.LatLng(50.7219134, 4.5294501);
    // drawLine([latLng, otherPoint]);
}

function createMarkerForHome(position) {
    var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    var marker = new google.maps.Marker({
        position: latLng,
        map: _map,
        animation: google.maps.Animation.DROP,
        title: 'This is my place !',
        icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
    });
}

function drawLine(path) {
    var line = new google.maps.Polyline({
        path: path,
        strokeColor: "#6da1ff",
        strokeOpacity: 1.0,
        strokeWeight: 5,
        map: _map
    });
}



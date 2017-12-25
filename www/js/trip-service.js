var TripService = function () {

    this.recordTripLog = function (data) {
        var sql = "INSERT INTO trip_log (trip_id,latitude,longitude,occurred) VALUES (?,?,?,?)";
        SQLDataAccessService.getInstance().executeQuery(sql,
            [data.tripId, data.latitude, data.longitude, Date.now()]);
    }

    this.getTripLogs = function(tripId, callBack) {
        var sql = "SELECT * FROM trip_log WHERE trip_id = ? order by occurred desc";
        var rows = SQLDataAccessService.getInstance().executeQuery(sql, [tripId]).done(function(data) {
            callBack(data);
        });
    }

    this.getAllTripIds = function(callBack) {
        var sql = "SELECT DISTINCT trip_id FROM trip_log";
        var rows = SQLDataAccessService.getInstance().executeQuery(sql, []);
        SQLDataAccessService.getInstance().executeQuery(sql, []).done(function(data) {
            callBack(data);
        });
    }

}
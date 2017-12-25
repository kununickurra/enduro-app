var SQLDataAccessService = (function () {

    var instance;

    var init = function () {

        var dbInstance;

        var initializeDb = function () {
            var deferred = $.Deferred();
            dbInstance = window.openDatabase("LocalDb", "1.0", "Local Database", 200000);
            dbInstance.transaction(
                function (tx) {
                    // dropSchema(tx);
                    createDbSchema(tx);
                },
                function (error) {
                    console.log('Transaction error: ' + error.message);
                    deferred.reject('Transaction error: ' + error.message);
                },
                function () {
                    console.log('Transaction success');
                    deferred.resolve();
                }
            );
            deferred.promise();
        }

        // var dropSchema = function (tx) {
        //     tx.executeSql('DROP TABLE trip_log');
        // }

        var createDbSchema = function (tx) {
            var sql = "CREATE TABLE IF NOT EXISTS trip_log ( " +
                "id INTEGER PRIMARY KEY AUTOINCREMENT, " +
                "trip_id VARCHAR(50), " +
                "latitude DECIMAL(9,6), " +
                "longitude DECIMAL(9,6), " +
                "occurred DATETIME)";
            tx.executeSql(sql, null,
                function () {
                    console.log('Create trip_log table success');
                },
                function (tx, error) {
                    alert('Create trip_log table error: ' + error.message);
                });
        }

        initializeDb();

        return {
            executeQuery: function (query, args) {
                var deferred = $.Deferred();
                dbInstance.transaction(
                    function (tx) {
                        tx.executeSql(query, args, function (tx, results) {
                            deferred.resolve(results.rows);
                        });
                    },
                    function (error) {
                        console.log(error.message);
                        deferred.reject("Transaction Error: " + error.message);
                    }
                );
                return deferred.promise();
            }
        }
    }

    return {

        getInstance: function () {
            if (!instance) {
                instance = init();
            }
            return instance;
        },

    };
})();

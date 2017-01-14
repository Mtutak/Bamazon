//Intending to EXPORT this as a seperate module to import in other files. 
//Load Dependencies
var mysql = require('mysql');
exports.connectSql = function () {
    //setting up connection using mysql npm
    var connection = mysql.createConnection({
        host: 'localhost',
        port: 3306,
        // Your username
        user: 'root',
        // Your password
        password: 'key',
        database: 'Bamazon'
    });
    //running connect method to notify when ready
    connection.connect(function (err) {
        //callback when connection comes back asynchronously
        if (err) throw err;
        console.log('connected as id' + connection.threadId);
    });
};
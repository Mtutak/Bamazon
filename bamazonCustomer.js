//Load Dependencies
var mysql = require('mysql');
var inquirer = require('inquirer');
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
//localhost is short for 127.0.0.1
//all servers on internet have IP address
connection.connect(function (err) {
    //callback when connection comes back asynchronously
    if (err) throw err;
    console.log('connected as id' + connection.threadId);
});
//Select only products where there is still stock
connection.query("SELECT product_name, item_id FROM products WHERE stock_quantity > 0", function (err, res) {
    if (err) throw err;
    //run through each index in array from res pulled from query and display specific data
    for (var i = 0; i < res.length; i++) {
        console.log("\n Product: " + res[i].product_name + " || ID: " + res[i].item_id + " || Price: " + res[i].price);
    }
});
// .then(promptOne);
promptOne();

function promptOne() {
    inquirer.prompt([{
        name: "id",
        type: "input",
        message: "What product ID would you like to buy?",
    }, {
        name: "units",
        type: "input",
        message: "How many units would you like to purchase?"
    }]).then(function (answer) {
        console.log(answer.id);
        console.log(answer.units);
        checkUnits(answer.id, answer.units);
    });
}

function checkUnits(productId, unitsReq) {
    connection.query("SELECT stock_quantity FROM products WHERE item_id = ?", productId, function (err, res) {
        if (err) throw err;
        console.log(res[0].stock_quantity);
        var quantityAvailable = res[0].stock_quantity;
        if (quantityAvailable >= unitsReq) {
            console.log("We can run your transaction");
        } else {
            console.log("Insufficient quantity! Only " + quantityAvailable + " units available.");
            return true;
        }
    });
}

function updateProductDb() {
    // connection.query()
    //update sql db with promise show the total cost to user
}
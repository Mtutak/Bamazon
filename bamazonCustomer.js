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
//running connect method to notify when ready
connection.connect(function (err) {
    //callback when connection comes back asynchronously
    if (err) throw err;
    console.log('connected as id' + connection.threadId);
    startingPrompt();
});

function startingPrompt() {
    //Select only products where there is still stock to display from db
    connection.query("SELECT product_name, item_id, price FROM products WHERE stock_quantity > 0", function (err, res) {
        if (err) throw err;
        //run through each index in array returned from res pulled from query above and display specific data
        for (var i = 0; i < res.length; i++) {
            console.log("\n Product: " + res[i].product_name + " || ID: " + res[i].item_id + " || Price: $" + res[i].price);
        }
        promptOne();
    });
    //function to display questions related to products displayed
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
            //run function to check product availibility with answers passed through in prompt
            checkUnits(answer.id, answer.units);
        });
    }
}

function checkUnits(productId, unitsReq) {
    //checking current chosen product stock with query
    connection.query("SELECT stock_quantity, price FROM products WHERE item_id = ?", productId, function (err, res) {
        if (err) throw err;
        console.log("Unit Check Query: " + res[0].stock_quantity);
        //storing current chosen product stock from db in variable 
        var quantityAvailable = res[0].stock_quantity;
        //conditional to check if enough of product
        if (quantityAvailable >= unitsReq) {
            console.log("We can run your transaction");
            //calculating stock available storing in variable could also calculate in query
            var updateUnits = quantityAvailable - unitsReq;
            console.log("Remaining Units in Stock: " + updateUnits);
            //run function to update dB with new stock
            updateProductDb(updateUnits, productId, unitsReq);
        } else {
            console.log("Insufficient quantity! Only " + quantityAvailable + " units available.");
        }
    });
}

function updateProductDb(unitsRemain, id, unitsReq) {
    //update query based upon user prompt responses
    connection.query("UPDATE products SET stock_quantity = ? WHERE item_id = ?", [unitsRemain, id], function (err, res) {
        if (err) throw err;
    });
    //run total cost calculation, user selection pased through as parameters
    totalCost(id, unitsReq);
}

function totalCost(chosenID, chosenUnits) {
    //variable for part 3
    var currentTotal;
    var currentSales;
    connection.query("SELECT item_id, price, stock_quantity, product_name, product_sales FROM products WHERE item_id = ?", chosenID, function (err, res) {
        if (err) throw err;
        //checking if there is any total sales currently in DB for part 3
        currentSales = res[0].product_sales;
        //calculated from current user chosen transaction
        var total = res[0].price * chosenUnits;
        console.log("Total Cost: " + total + " for " + res[0].product_name + " with ID: " + res[0].item_id);
        //after checking if any product sales are in db set value of current total with condition
        if (currentSales > 0) {
            currentTotal = total + currentSales;
        } else {
            currentTotal = total;
        }
    });
    //after setting currentTotal value then update db with new product sales total from current transaction
    connection.query("UPDATE products SET product_sales = ? WHERE item_id = ?", [currentTotal, chosenID], function (err, res) {
        if (err) throw err;
    });
    //for part 3 query department name and product_sales add all product sales from the same department into total_sales column for that department
    startingPrompt();
}
// sum(sales_price) GROUP BY (department)
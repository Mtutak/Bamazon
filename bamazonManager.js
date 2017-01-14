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
    startAppPrompt();
});

function startAppPrompt() {
    inquirer.prompt({
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: ["View Product for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
    }).then(function (answer) {
        console.log(answer.action);
        switch (answer.action) {
        case "View Product for Sale":
            saleProducts();
            break;
        case "View Low Inventory":
            lowInventory();
            break;
        case "Add to Inventory":
            addInventory();
            break;
        case "Add New Product":
            addNewProduct();
            break;
        default:
            console.log("Something Went Wrong. Try Choosing a valid option. If not contact NU Bootcamp TAs");
        }
    });
}
//Select only products where there is still stock to display from db
function saleProducts() {
    connection.query("SELECT product_name, item_id, price, stock_quantity FROM products WHERE stock_quantity > 0", function (err, res) {
        if (err) throw err;
        //run through each index in array returned from res pulled from query above and display specific data
        for (var i = 0; i < res.length; i++) {
            console.log("\n Product: " + res[i].product_name + " || ID: " + res[i].item_id + " || Stock: " + res[i].stock_quantity + " || Price: $" + res[i].price);
        }
        startAppPrompt();
    });
}

function lowInventory() {
    connection.query("SELECT product_name, item_id, price, stock_quantity FROM products WHERE stock_quantity < 5", function (err, res) {
        if (err) throw err;
        //run through each index in array returned from res pulled from query above and display specific data
        for (var i = 0; i < res.length; i++) {
            console.log("\n Product: " + res[i].product_name + " || ID: " + res[i].item_id + " || Stock: " + res[i].stock_quantity + " || Price: $" + res[i].price);
        }
        startAppPrompt();
    });
}

function addInventory() {
    inquirer.prompt([{
        name: "id",
        type: "input",
        message: "What product ID would you like to add inventory?"
    }, {
        name: "units",
        type: "input",
        message: "How many units would you like to TOTAL?"
    }]).then(function (answer) {
        var id = answer.id;
        var units = answer.units;
        connection.query("UPDATE products SET stock_quantity = ? WHERE item_id = ?", [units, id], function (err, res) {
            if (err) throw err;
            console.log("Successful update of item " + id + " with " + units + " units!");
        });
        startAppPrompt();
    });
}

function addNewProduct() {
    inquirer.prompt([{
        name: "product",
        type: "input",
        message: "Product name of the item you would like to add."
    }, {
        name: "units",
        type: "input",
        message: "How many units are available for this item?",
    }, {
        name: "depart",
        type: "input",
        message: "What department for this item?",
    }, {
        name: "price",
        type: "input",
        message: "How much for this item?"
    }]).then(function (answer) {
        var name = (answer.product);
        var depart = (answer.depart);
        var price = (answer.price);
        var stock = (answer.units);
        var post = {
            product_name: name,
            department_name: depart,
            price: price,
            stock_quantity: stock
        };
        connection.query("INSERT INTO products SET ?", post, function (err, res) {
            if (err) throw err;
            console.log(res.affectedRows + " Rows effected!");
            console.log("Successful addition of item " + name + " with " + stock + " units!");
        });
        startAppPrompt();
    });
}
// If a manager selects View Products for Sale, the app should list every available item: the item IDs, names, prices, and quantities.
// If a manager selects View Low Inventory, then it should list all items with a inventory count lower than five.
// If a manager selects Add to Inventory, your app should display a prompt that will let the manager "add more" of any item currently in the store.
// If a manager selects Add New Product, it should allow the manager to add a completely new product to the store.
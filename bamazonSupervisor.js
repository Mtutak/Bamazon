//Load Dependencies
var mysql = require('mysql');
var inquirer = require('inquirer');
var table = require('console.table');

function startingPromptOne() {
    inquirer.prompt([{
        name: "id",
        type: "list",
        message: "What would you like to do?",
        choices: ["View Product Sales by Department", "Create New Department"]
    }]).then(function (answer) {
        if (answer.id === "View Product Sales by Department") {
            //summary table
            connection.query("SELECT department_id, department_name, over_head_costs, product_sales,(total_sales - over_head_costs) AS total_profit FROM departments", function (err, res) {
                if (err) throw err;
                console.table(res);
            });
        } else if (answer.id === "Create New Department") {
            connection.query("UPDATE products SET stock_quantity = ? WHERE item_id = ?", [units, id], function (err, res) {
                if (err) throw err;
                console.log("Successful update of item " + id + " with " + units + " units!");
            });
        } else {
            console.log("Error processing your request. Please Try Again");
        }
    });
}
//Load Dependencies
var mysql = require('mysql');
var inquirer = require('inquirer');
inquierer.prompt({
    name: "action",
    type: "list",
    message: "What would you like to do?",
    choices: ["View Product for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
}).then(function (answer) {
    console.log('stuff');
});
// If a manager selects View Products for Sale, the app should list every available item: the item IDs, names, prices, and quantities.
// If a manager selects View Low Inventory, then it should list all items with a inventory count lower than five.
// If a manager selects Add to Inventory, your app should display a prompt that will let the manager "add more" of any item currently in the store.
// If a manager selects Add New Product, it should allow the manager to add a completely new product to the store.
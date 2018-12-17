var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 8889,
    user: "root",
    // Your password
    password: "",
    database: "bamazon_DB"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log(`Connected as id ${connection.threadId}\n`);
    promptManager();
});

function promptManager () {

    inquirer.prompt([
        {
            type: "list",
            name: "managerFunction",
            message: "Welcome. Please select an option:",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"],
            filter: function (val) {
                if (val === "View Products for Sale") {
                    return "view_products"
                }
                else if (val === "View Low Inventory") {
                    return "low_inventory"
                }
                else if (val === "Add to Inventory") {
                    return "add_inventory"
                }
                else {
                    return "add_product"
                }
            } 
        }
    ]).then(function (input) {
        if (input.managerFunction === "view_products") {
            viewProducts();
        }
        else if (input.managerFunction === "low_inventory") {
            lowInventory();
        }
        else if (input.managerFunction === "add_inventory") {
            addInventory();
        }
        else {
            addProduct();
        }
    });
};

function viewProducts() {
    console.log("--------------------------");
    console.log("ALL Current Inventory:\n");

    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;

        for (var i = 0; i < res.length; i++) {
            console.log(`Item ID: ${res[i].item_id}`);
            console.log(`Product: ${res[i].product_name}`);
            console.log(`Department: ${res[i].department_name}`);
            console.log(`Price: ${res[i].price}`);
            console.log(`Quantity: ${res[i].stock_quantity}\n`);
        };

        console.log("--------------------------\n");
        
        connection.end();
    });
};

function lowInventory() {
    console.log("--------------------------");
    console.log("Low Inventory:\n");

    connection.query("SELECT * FROM products WHERE stock_quantity < 25", function(err, res) {
        if (err) throw err;

        for (var i = 0; i < res.length; i++) {
            console.log(`Item ID: ${res[i].item_id}`);
            console.log(`Product: ${res[i].product_name}`);
            console.log(`Department: ${res[i].department_name}`);
            console.log(`Price: ${res[i].price}`);
            console.log(`Quantity: ${res[i].stock_quantity}\n`);
        };

        console.log("--------------------------\n");
        
        connection.end();
    });
};

function addInventory() {
    console.log("--------------------------\n");

    inquirer.prompt([
        {
            type: "input",
            name: "item_id",
            message: "What is the ID of the item you want to add?"
        },
        {
            type: "input",
            name: "quantity",
            message: "How much of that item are you adding?"
        }
    ]).then(function(answer) {
        var item_id = parseInt(answer.item_id);
        var quantity = parseInt(answer.quantity);

        console.log(`Product ID: ${item_id}`);
        console.log(`Product Quantity to Add: ${quantity}`);

        connection.query("SELECT * FROM products WHERE ?", {item_id:item_id}, function (err, data) {
            if (err) throw err;

            if (data.length === 0) {
                console.log("Invalid, please select a valid ID!");

                viewProducts();
                addInventory();
            }
            else {
                console.log("-------------------------------");
                console.log("Adding product to inventory...");
                console.log("-------------------------------\n");


                var product = data[0];

                // Put in variable because it's a long string inside the query
                var updateQuantity = `UPDATE products SET stock_quantity = ${product.stock_quantity + quantity} WHERE item_id = ${item_id}`;
                        
                connection.query(updateQuantity, function(err, data) {
                    if (err) throw err;

                    console.log(`New Quantity: ${product.stock_quantity + quantity}\n`);

                    inquirer.prompt([
                        {
                            type: "list",
                            name: "shop_again",
                            message: "Would you like to add more product to the current inventory?",
                            choices: ["Yes", "No"]
                        }
                    ]).then(function(answer) {
                        if (answer.shop_again === "Yes") {
                            addInventory();
                        }
                        else {
                            console.log("Thank you, come again!");

                            connection.end();
                        };
                    });
                });
            };
        });
    });
};

function addProduct() {
    inquirer.prompt([
        {
            type: "input",
            name: "product_name",
            message: "What is the name of the new product?"
        },
        {
            type: "input",
            name: "department_name",
            message: "What department does the new product belong to?"
        },
        {
            type: "input",
            name: "price",
            message: "What is the price of the new product?"
        },
        {
            type: "input",
            name: "stock_quantity",
            message: "How many units of the new product are on hand?"
        },
    ]).then(function(response) {
        console.log("-------------------------------");
        console.log("Adding product to inventory...\n");
        console.log(`Product: ${response.product_name}`);
        console.log(`Department: ${response.department_name}`);
        console.log(`Price: ${response.price}`);
        console.log(`Quantity: ${response.stock_quantity}\n`);
        console.log("-------------------------------\n");

        connection.query("INSERT INTO products SET ?", response, function(err, data, fields) {
            if (err) throw err;

            // console.log(data);
            console.log(`New product added at ID: ${data.insertId}`);

            inquirer.prompt([
                {
                    type: "list",
                    name: "shop_again",
                    message: "Would you like to add another product to the current inventory?",
                    choices: ["Yes", "No"]
                }
            ]).then(function(answer) {
                if (answer.shop_again === "Yes") {
                    addProduct();
                }
                else {
                    console.log("Thank you, come again!");

                    connection.end();
                };
            });
        });
    });
};
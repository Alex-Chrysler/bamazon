var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "bamazon_db"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  afterConnection();
});

function afterConnection() {
    inquirer.prompt([
        {
          type: "list", 
          name: "managerMenu",
          message: "Please make a selection",
          choices: [
              "View Products for Sale",
              "View Low Inventory",
              "Add to Inventory",
              "Add New Product",
          ]
        },

    ]).then(function(answer) {
        if (answer.managerMenu === "View Products for Sale"){
            console.log("You wish to view all products for sale")
            displayProducts();
            connection.end();
        }

        else if(answer.managerMenu === "View Low Inventory"){
            console.log("You wish to view low inventory items")
            displayLowStock();
            connection.end();
        }

        else if(answer.managerMenu === "Add to Inventory") {
            console.log("You wish to add items to the current stock")
            displayProducts();
            addInventory();

        }

        else if(answer.managerMenu === "Add New Product") {
            console.log("You wish to add a new product to our store")
            createProduct()
            connection.end()
        }
    })
}

function displayProducts() {
    connection.query("SELECT * FROM products", function(err, res) {
      if (err) throw err;
      for (let record in res) {
          let product = res[record]
          console.log(
              "ProductID:", product.id, "///",
              "Product Name:", product.product_name, "///",
              "Price:", product.price,  "///",
              "Store quantity:", product.stock_quantity, "///",
              "Department:", product.department_name, "///"
          )
      }
    });
  }

  function displayLowStock() {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        for (let record in res) {
            let product = res[record]
            if (product.stock_quantity < 5){
                console.log(product.product_name + " is running low. The remaining stock is: " + product.stock_quantity)
            }
        }
    })
    }

function addInventory() {
    inquirer.prompt([
        {
          type: "input", 
          name: "addItem",
          message: "What itemID would you like to restock?",
        },
        {
            type: "input",
            name: "addQuant",
            message: "What is the new total Stock?"
        }
    ]).then(function(answers) {
        var query = connection.query( "UPDATE products SET ? WHERE ?",
        [ 
            {
                stock_quantity: answers.addQuant
            },
            {
                id: answers.addItem
            }
        ],
        function(err, res) {
            if (err) throw err;
            console.log(res.affectedRows + " products updated!\n");
        }
        )
        console.log(query.sql);
        connection.end();
    }
     )}

     function createProduct() {
        inquirer.prompt([
            {
              type: "input", 
              name: "newItem",
              message: "What item would you like to add to our store?",
            },
            {
                type: "input",
                name: "addQuant",
                message: "How many would you like to add?"
            },
            {
                type:"input",
                name: "newPrice",
                message: "How much will it cost per unit?"
            },
            {
                type: "input",
                name: "newDepart",
                message: "What Department?"
            }
        ]).then(function(answers) {

        var query = connection.query(
          "INSERT INTO products SET ?",
          {
            product_name: answers.newItem,
            department_name: answers.newDepart,
            price: answers.newPrice,
            stock_quantity: answers.addQuant,
            
          },
          function(err, res) {
            console.log("You added " + answers.newItem);
            console.log(query.sql);
        }
        )}
        )};   
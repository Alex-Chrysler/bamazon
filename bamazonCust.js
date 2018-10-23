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
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    for (let record in res) {
        let product = res[record]
        console.log(
            "ProductID:", product.id, "///",
            "Product Name:", product.product_name, "///",
            "Price:", product.price,  "///",
            "Store quantity:", product.stock_quantity, "///",
        )
    }
    bidPrompt()
  });
}

function bidPrompt() {
  inquirer.prompt([
    {
      name: "userItem_id",
      message: "What is the id of the product you would like to order?"
    },
    {
      name: "userQuantity",
      message: "How many would you like?"
    }
]).then(function(answers) {
  connection.query("SELECT stock_quantity, price FROM products WHERE id =" + answers.userItem_id, function(err, res) {
    if (err) throw err;

    if (answers.userQuantity <= res[0].stock_quantity) {

      var newQuantity = res[0].stock_quantity - answers.userQuantity;
      var cost = answers.userQuantity * res[0].price;
      console.log("new store quantity: " + newQuantity);
      

      connection.query(
        "UPDATE products SET ? WHERE ?",
        [ {stock_quantity: newQuantity},
          {id: answers.userItem_id}],
        function(err, res) {
        if (err) throw err;
        
        console.log("The cost of your order is $" + cost);
        connection.end();
      })
    }
    else {
      console.log("Insufficient quantity");
      console.log("Our current stock: " + res[0].stock_quantity);
      connection.end();
    }
  })
})
}



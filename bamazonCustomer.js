var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
  
    port: 3306,
  
    user: "root",
  
    password: "A4077ing!",
    database: "bamazonDB"
  });

  connection.connect(function(err) {
    if (err) throw err;
    display();
  });

  function display() {
    connection.query("SELECT * FROM products", function(err, res) {
        if(err) throw err;
        console.log("Here are the current product offerings.");
        for (var i=0; i<res.length; i++) {
            console.log("id: " + res[i].item_id);
            console.log("product: " + res[i].product_name);
            console.log("price: " + res[i].price);
            console.log("_____________________________")
        }
    })
    prompt();
  }
  
//   var stockQuantity = res.stock_quantity;

  function prompt() {
    
    inquirer
      .prompt([
          {
        name: "purchase",
        type: "input",
        message: "Please enter the ID to the item you would like to purchase."
      },
      {
          name: "amount",
          type: "input",
          message: "How many would you like to purchase?"
      }
    ])
      .then(function(answer) {
        var chosen = answer.purchase;
        var chosenId = (answer.purchase -1);
        
        connection.query("SELECT * FROM products", function(err, res) {
            if(err) throw err;
            var total = (answer.amount * res[chosenId].price);
                var stockQuantity = res[chosenId].stock_quantity;

if (parseInt(answer.amount) < parseInt(res[chosenId].stock_quantity)){
    
    connection.query("UPDATE products SET ? WHERE ?", [
        {
            stock_quantity: stockQuantity - answer.amount
        },
        {
            item_id: chosen
        },
    ],
    console.log ("You ordered "+ answer.amount +" "+ res[chosenId].product_name + " and your total is $" + total),
    
    function(err, results) {

    })
    connection.end();
          
}
else {
console.log("Sorry, we do not have enough of that product to fill your order.");
connection.end();
}
      });
      
    })
    
}
    
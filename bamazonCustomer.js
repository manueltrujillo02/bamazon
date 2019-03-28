
var inquirer = require('inquirer');
var mysql = require('mysql');
var products = "";

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3307,

    // Your username
    user: "root",

    // Your password
    password: "password",
    database: "bamazon_db"
});

connection.connect(err => {
    if (err) throw err;
    // console.log("connected as id " + connection.threadId + "\n");
    // createProduct();
    readProducts()
});



function readProducts() {
    console.log("Selecting all products...\n");
    connection.query("SELECT * FROM products", (err, res) => {
        if (err) throw err;
        // Log all results of the SELECT statement
        products = res;

        console.table(res);
        userItem();

    });
}

function userItem() {
   

    inquirer
        .prompt([{

            name: "item",
            type: "input",
            message: "What is the ID of the item you want to purchase?",
            //   choices: productNames
        },
        {
            name: "quantity",
            type: "input",
            message: "How many wouuld you like?"
        }])

        .then(function (answers) {
            
            console.log(answers);
            // var settingVar = products.filter(product => products.item);
            // var productNames = settingVar.map(product => product.quantity);
            // var newVar = answers.quantity;
            var newQuantity = answers.quantity;
            // console.log(productNames);
      
            connection.query("UPDATE products SET? WHERE?", [
                {
                    quantity: newQuantity
                },
                {
                    id: answers.item
                }
            ])
            connection.query("SELECT * FROM products",(err, res) =>{

            
               console.table(res)
                
         
            });
            // var selectedItem = products.find(product => product.id === answer.item);

            // console.log(
            // if(selectedItem.quantity > parseInt(answer.quantity)){
            //     console.log(true);
            // }else{
            //     console.log("no");
            //     console.table(products);
            //     userItem();
            // }

            //   }
            
            connection.end();
        })


       
};

function updateProducts() {

}
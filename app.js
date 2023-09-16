const port = 3000;
 
const express = require("express");  
const mysql = require('mysql2');
const cors = require("cors");
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.listen(3000);

const con= mysql.createConnection({
	host:"mysql-philippehou.alwaysdata.net", 
	user: "289337_root",
	password: "Tm3x-dCQ7k3mLMf",
	database:"philippehou_gestionproduit" 
});
 
con.connect(function(err){
    if(err) throw err; 
});

app.get("/", function(request, response){
    con.query("SELECT * FROM Produit", function(err, result, fields){
        if(err) throw err; 
        response.status(200).json(result);
    }); 
});

app.get("/getAllProducts", function(request, response){
    con.query("SELECT * FROM Produit", function(err, result, fields){
        if(err) throw err; 
        response.status(200).json(result);
    }); 
});
 

app.get("/getProduct/:id", function(req, res) { 
    const id = req.params.id;

    const query = "SELECT * FROM Produit WHERE id = ?;";
    const values = [id];

    con.query(query, values, function(err, result, fields) {
        if(err) throw err; 
        if (result.length > 0) {
            console.log(JSON.stringify(result[0]));
            res.status(200).json({
                message: "Product trouvé",
                data: result[0]
            });
        } else {
            console.log("Product non trouvé");
            res.status(404).json({
                message: "Aucun acteur trouvé",
                data: {}
            });
        }
    });
});
 

app.post('/createProduct', (req, res) => {
    const produit = {
        description: req.body.description,
        image: req.body.image,
        prix: req.body.prix, 
        details: req.body.details 
    }; 
     
    const query = "INSERT INTO produit (description, image, prix, details) VALUES (?, ?, ?, ?);";
    const values = [produit.description, produit.image, produit.prix, produit.details];

    con.query(query, values, (err, result, fields) => {
        if (err) {
            console.error("Error adding product:", err); 
            return res.status(500).json({ message: "An error occurred while adding the product." });
        }
        res.status(200).json({ message: "Produit ajouté" });
    });
});

app.put("/updateProduct/:id", function(req, res) { 
    const id= req.params.id; 
    const produit = {
        description: req.body.description,
        image: req.body.image,
        prix: req.body.prix, 
        details: req.body.details 
    }; 
     
    const query = "UPDATE Produit SET description = ?, image = ?, prix = ?, details = ?  WHERE id = ?;";
     
    const values = [produit.description, produit.image, produit.prix, produit.details, id];

    con.query(query, values, (err, result, fields) => {
        if (err) throw err;
        res.status(200).json({ message: "Produit modifié" });
    }); 
});


app.delete("/deleteProduct/:id", function(req, res){
    const id = req.params.id;  
    query = "DELETE FROM Produit where id = ?";
    const values = [id];
    con.query(query, values, (err, result, fields) => { 
        if(err) throw err; 
        res.status(200).json({ message: "Produit supprimé" }); 
    });  
});










 

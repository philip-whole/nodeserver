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
/* 
	  host:"localhost",
	  user: "root",
	  password: "Zh9$*@92If84",
	  database:"gestionproduit" 
*/ 

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
 

app.get("/getProduct/:id", function(request, response){
    const id= request.params.id;
    con.query("SELECT * FROM Produit WHERE id = ?", id, function(err, result, fields){
        if(err) throw err;
        if(result.length > 0 ){
            console.log(JSON.stringify(result[0]));
            response.status(200).json({
                message: "produit trouvé",
                data: result[0]
            });
            }
     
           else{
            console.log("Produit non trouvé");
            response.status(200).json({
                message: "Aucun trouvé",
                data: {}
            });
           }
        });
    }); 
 

app.post("/createProduct", function(request, response){
    const produit= request.body;
    console.log(produit.description + " "+ produit.image + 
            " "+ produit.prix +" "+ produit.details)
    console.log(JSON.stringify(produit)); 

    con.query("INSERT INTO Produit values(null, '" + produit.description +" ',' " + produit.image+
    " ', " + produit.prix + " ,' " + produit.details + " '); ", function (err, result, fields)
    {
        if(err) throw err;  
        response.status(200).json({ message: "Produit ajouté" });
    }); 
});

app.put("/updateProduct/:id", function(request, response) {
    const id = request.params.id;
    const produit = request.body;  
        
        con.query("UPDATE Produit SET description = '" + produit.description +

            "', image = '" + produit.image +
            "', prix = '" + produit.prix +
            "', details = '" + produit.details + 
            "' WHERE id = " + id, function(err, result, fields) {
            if (err) throw err; 
            response.status(200).json({ message: "Produit modifié" }); 
    });
});


app.delete("/deleteProduct/:id", function(request, response){
    const id= request.params.id;  
    con.query("DELETE FROM Produit where id = "+ id, function(err, result, fields){ 
        if(err) throw err; 
        response.status(200).json({ message: "Produit supprimé" }); 
    });  
});










 

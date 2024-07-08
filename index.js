const express = require('express');
const app = express();
const path = require('path');
const data = require("./data.json")

let port = 8080;

app.set("view engine","ejs");
app.set("views", path.join(__dirname,"/views"));
app.use(express.static(path.join(__dirname, 'public')));


app.get("/",(req,res)=>{
    const air = data.shoes.air.products;
    res.render("home.ejs",{air});
})

app.listen(port, ()=>{
    console.log(`App is listening on port ${port}`);
})
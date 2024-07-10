const express = require('express');
const app = express();
const path = require('path');
const data = require("./data.json")

let port = 8080;

app.set("view engine","ejs");
app.set("views", path.join(__dirname,"/views"));
app.use(express.static(path.join(__dirname, 'public')));

app.get("/shoes", (req,res)=>{
    res.render("shoes.ejs", {data});
})
app.get("/",(req,res)=>{
    const air = data.shoes.air.products;
    const latest = data.shoes.latest.products;
    const classic = data.shoes.classic.products;
    res.render("home.ejs",{air,latest,classic});
})

app.listen(port, ()=>{
    console.log(`App is listening on port ${port}`);
})
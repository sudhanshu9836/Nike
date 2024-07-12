const express = require('express');
const app = express();
const path = require('path');
const data = require("./data.json")
const bag = [];
app.use(express.urlencoded({ extended: true }));
let port = 8080;

app.set("view engine","ejs");
app.set("views", path.join(__dirname,"/views"));
app.use(express.static(path.join(__dirname, 'public')));

app.get("/shoes", (req,res)=>{
    res.render("shoes.ejs", {data});
})

app.get("/shoes/:domCategory", (req,res)=>{
    let category = req.params.domCategory;
    let shoeData = null;
    if (data.shoes.hasOwnProperty(category)){
        shoeData = data.shoes[category].products
    }
    res.render("shoeCategoryPage.ejs", {shoeData});
})

function findShoeById(id){
    for(let category in data.shoes){
        for (let product of data.shoes[category].products){
            if(product.id == id){
                return product;
            }
        }
    }
    return null;
}
app.get("/shoes/shoe/:domId",(req,res)=>{
    let id = req.params.domId;
    const shoe = findShoeById(id);
    console.log(shoe.name);
    res.render("singleShoe.ejs", {shoe});
})


app.post("/bag",(req,res)=>{
    const id = req.body.idOfShoe;
    const shoe = findShoeById(id);
    bag.push(shoe);
    res.render("bag.ejs", {bag})
})
app.get("/bag", (req,res)=>{
    res.render("bag.ejs",{bag});
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
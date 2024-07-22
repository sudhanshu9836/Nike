const express = require('express');
const app = express();
const path = require('path');
const data = require("./data.json")
let bag = [];
let fav = [];
app.use(express.urlencoded({ extended: true }));
let port = 8080;

const methodOverride = require("method-override");
app.use(methodOverride("_method"));

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
    let q = 1;
    res.render("singleShoe.ejs", {shoe, q});
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
app.delete("/bag/:id", (req,res)=>{
    let id = req.params.id;
    bag = bag.filter((i)=> id != i.id);
    res.redirect("/bag");
})

app.get("/favourites",(req,res)=>{
    res.render("favourites.ejs",{fav});
})
app.post("/favourites", (req, res) => {
    const id = req.body.idOfFavShoe;
    const shoe = findShoeById(id);
    if (shoe && !fav.includes(shoe)) { 
        fav.push(shoe);
    }
    res.render("favourites.ejs", { fav });
});

app.get("/",(req,res)=>{
    const air = data.shoes.air.products;
    const latest = data.shoes.latest.products;
    const classic = data.shoes.classic.products;
    res.render("home.ejs",{air,latest,classic});
})

app.listen(port, ()=>{
    console.log(`App is listening on port ${port}`);
})
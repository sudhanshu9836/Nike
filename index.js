const express = require('express');
const methodOverride = require("method-override");
const path = require('path');
const data = require("./data.json")

const link = "http://localhost:8080";

const app = express();
let bag = [];
let fav = [];
let port = 8080;

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'))

app.set("view engine","ejs");
app.set("views", path.join(__dirname,"/views"));
app.use(express.static(path.join(__dirname, 'public')));

app.get("/shoes", (req,res)=>{
    res.render("shoes.ejs", {data,link});
})

app.get("/shoes/:domCategory", (req,res)=>{
    let category = req.params.domCategory;
    let shoeData = null;
    if (data.shoes.hasOwnProperty(category)){
        shoeData = data.shoes[category].products
    }
    res.render("shoeCategoryPage.ejs", {shoeData,link});
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
    let s = 1;
    res.render("singleShoe.ejs", {shoe, q,s, fav,link});
})

app.post("/search", (req, res) => {
    const search = req.body.usersearch.toLowerCase();
    console.log(search);
    let s = null;

    for (let category in data.shoes) {
        if (data.shoes[category].products && Array.isArray(data.shoes[category].products)) {
            for (let shoe of data.shoes[category].products) {
                if (search === shoe.name.toLowerCase()) {
                    s = shoe;
                    break;
                }
            }
        }
        if (s) break;
    }


    res.render("search.ejs", { search, s, link });
});

app.post("/bag",(req,res)=>{
    const id = req.body.idOfShoe;
    const quantity = parseInt(req.body.quantity) || 1;
    const size = req.body.size;
    const shoe = findShoeById(id);

    let found = false;
    for (let item of bag) {
        if (item.product.id === id) {
            item.quantity += quantity;
            found = true;
            break;
        }
    }
    if (!found) {
        bag.push({ product: shoe, quantity: quantity, size: size });
    }

    res.redirect("/bag");
})

app.get("/bag", (req,res)=>{
    res.render("bag.ejs",{bag,link});
})
app.delete("/bag/:id", (req,res)=>{
    let id = req.params.id;
    bag = bag.filter((i)=> id !== i.id);
    res.redirect("/bag");
})
app.delete("/favourites/:id", (req, res)=>{
    let id = req.params.id;
    fav = fav.filter((i)=>i.id!=id);
    res.redirect("/favourites")
})

app.get("/favourites",(req,res)=>{
    res.render("favourites.ejs",{fav,link});
})
app.post("/favourites", (req, res) => {
    const id = req.body.idOfFavShoe;
    const shoe = findShoeById(id);
    if (shoe && !fav.includes(shoe)) { 
        fav.push(shoe);
    }
    res.render("favourites.ejs", { fav,link });
});

app.get("/",(req,res)=>{
    const air = data.shoes.air.products;
    const latest = data.shoes.latest.products;
    const classic = data.shoes.classic.products;
    res.render("home.ejs",{air,latest,classic,link});
})

app.listen(port, ()=>{
    console.log(`App is listening on port ${port}`);
})
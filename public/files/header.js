const newFeatured = document.getElementById("new-featured");
const newCategoryBox = document.getElementById("new-category-box");
const men = document.getElementById("men");
const menCategoryBox = document.getElementById("men-category-box");
const women = document.getElementById("women");
const womenCategoryBox = document.getElementById("women-category-box");
const sales = document.getElementById("sale");
const custom = document.getElementById("customise");


// New and Featured

newFeatured.addEventListener("mouseover", () => {
    newCategoryBox.style.display = "block";
    menCategoryBox.style.display = "none";
    womenCategoryBox.style.display = "none";

});
newCategoryBox.addEventListener("mouseover", () => {
    newCategoryBox.style.display = "block";
});
newCategoryBox.addEventListener("mouseout", () => {
    newCategoryBox.style.display = "none";
});

// Men

men.addEventListener("mouseover", () => {
    menCategoryBox.style.display = "block";
    newCategoryBox.style.display = "none";
    womenCategoryBox.style.display = "none";
});
menCategoryBox.addEventListener("mouseover", () => {
    menCategoryBox.style.display = "block";
});
menCategoryBox.addEventListener("mouseout", () => {
    menCategoryBox.style.display = "none";
});

// Women

women.addEventListener("mouseover", () => {
    womenCategoryBox.style.display = "block";
    newCategoryBox.style.display = "none";
    menCategoryBox.style.display = "none";
});
womenCategoryBox.addEventListener("mouseover", () => {
    womenCategoryBox.style.display = "block";
});
womenCategoryBox.addEventListener("mouseout", () => {
    womenCategoryBox.style.display = "none";
});


// sale

sales.addEventListener("mouseover",()=>{
    newCategoryBox.style.display = "none";
    menCategoryBox.style.display = "none";
    womenCategoryBox.style.display = "none";
})
custom.addEventListener("mouseover",()=>{
    newCategoryBox.style.display = "none";
    menCategoryBox.style.display = "none";
    womenCategoryBox.style.display = "none";
})
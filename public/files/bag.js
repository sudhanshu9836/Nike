let c = document.getElementById("contain");
let bt = document.getElementById("bt4");
let cl = document.getElementById("close")

bt.addEventListener("click",(req,res)=>{
        c.showModal();
})

cl.addEventListener("click", (req,res)=>{
    c.close();
})


let m = document.getElementById("checkout");

// Placing order

let p = document.getElementById("bt7");

p.addEventListener("click", (req,res)=>{
    m.innerHTML = "Order Placed";
    c.style.display = "flex";
    m.style.textAlign = "center";
    c.style.alignItems = "center" ;
    m.style.fontSize = "2.5em";
    let cross = document.createElement("button");
    cross.innerHTML = "X";
    m.appendChild(cross);
    cross.id = "close2";
})

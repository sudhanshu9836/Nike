let c = document.getElementById("contain");
let bt = document.getElementById("bt4");
let cl = document.getElementById("close")
// cl.style.cursor = "pointer";  

bt.addEventListener("click",(req,res)=>{
        c.showModal();
})

cl.addEventListener("click", (req,res)=>{
    c.close();
})
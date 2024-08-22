let arrImg=["waffle","creme-brulee","macaron","tiramisu","baklava","meringue","cake","brownie","panna-cotta"]
let add=document.querySelector(".add")
let page=document.querySelector(".page")
let items=document.querySelector(".items")
let number=document.querySelector(".number")
let right=document.querySelector(".right")
let popCount=document.querySelector(".popCount")
let shodo=document.querySelector(".shodo")
let done=document.querySelector(".done")
let priceTotal;





let arr;
if(localStorage.items && localStorage.items !='[]'){
    arr=JSON.parse(localStorage.items);
    item(arr);
    number.innerHTML=arr.length
}else{
    arr=[]
}

priceTotal.innerHTML+=JSON.parse(localStorage.getItem("total"))





function getdata(id){
    setTimeout(()=>{
        location.reload()
    },1700)
    let element =document.getElementById(`s${id}`)
    let dataOb={
        img:arrImg[id],
        marka:element.children[0].innerHTML,
        name:element.children[1].innerHTML,
        price:element.children[2].children[1].innerHTML,
    }
    console.log(dataOb.price)
    arr.push(dataOb)
    localStorage.setItem("items",JSON.stringify(arr))
}

function show(id){
    shodo.style.display="block"
    let element =document.getElementById(`s${id}`)

    let dataOb={
        img:arrImg[id],
        marka:element.children[0].innerHTML,
        name:element.children[1].innerHTML,
        price:element.children[2].innerHTML,
    }
    let pop = 
    `
        <div class="card p-3 pt-5 " style="width: 21rem;">
            <button class="close" onclick="hiddenPop()"><i class="fa-solid fa-xmark"></i></button>
            <img src="./images/image-${dataOb.img}-desktop.jpg" alt="" height="200px">
            <div class="card-body">
                <h5 class="card-title marka">${dataOb.marka}</h5>
                <p class="card-text name">${dataOb.name}</p>
                <p class="card-text price ">${dataOb.price}</p>
                <input class="form-control" type="number" placeholder="Number" value="1" aria-label="default input example">
                <div class="bo d-flex justify-content-center">
                    <button class="btn btn-primary mt-3 mb-3 w-50" onclick="addItem(${id})">Add</button>
                </div>
            </div>
        </div>
    `
    popCount.style.display="block"
    popCount.innerHTML = pop;
}
function addItem(id){
    let input=document.querySelector("input")
    Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your work has been saved",
        showConfirmButton: false,
        timer: 1500
    });
    for(let i=0;i<input.value;i++){
        alert="Done"
        getdata(id)
        item(arr);
        number.innerHTML=arr.length
    }
    shodo.style.display="none"
    popCount.innerHTML = '';
    calcPrice(arr)
}

function item(arr){
    items.innerHTML=''
    let task=''
    arr.forEach((element,ind) => {
        task +=
            `
                <div class="item d-flex align-items-center p-2 rounded-2 mb-2 justify-content-sm-between">
                    <img src="./images/image-${element.img}-desktop.jpg" alt="" class="imgInItem">
                    <div class="text ms-3 d-flex align-items-center ">
                        <div class="left">
                            <p class="nameInItem fw-normal">${element.name}</p>
                            <p class="priceInItem">${element.price}</p>
                        </div>
                        <div class="right" id=${ind} onclick=deleteItem(this.id)>
                            <i class="fa-solid fa-trash"></i>
                        </div>
                    </div>
                </div>
            `
    });
    items.innerHTML=task
    items.innerHTML += 
    `
        <div class="total d-flex justify-content-between">
            <p class="name">Total Price</p>
            <p class="price priceTotal">$ <span class="priceTotal"></span></p>
        </div>
        <div class="buttons d-flex justify-content-between">
            <button class="btn btn-success" onclick="popEnd()">Buy All</button>
            <button class="btn btn-danger" onclick="clears()">Clear All</button>
        </div>
    `
    priceTotal=document.querySelector(".priceTotal")
}
function clears(){
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
    if (result.isConfirmed) {
        localStorage.clear()
        arr.length=0
        setTimeout(()=>{
            setTimeout(()=>{
                location.reload()
            },1000)
        },3000)
        Swal.fire({
        title: "Deleted!",
        text: "Your Products has been Cleared.",
        icon: "success"
        });
    }
    });
}

function deleteItem(i){
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
    if (result.isConfirmed) {
        arr.splice(i,1);
        localStorage.setItem("items",JSON.stringify(arr))
        item(arr);
        if (localStorage.items =='[]'){
            setTimeout(()=>{
                location.reload()
            },1700)
        }
        Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success"
        });
    }
    });
}
function hiddenPop(){
    popCount.style.display="none";
    shodo.style.display="none";
}
function calcPrice(arr){
    priceTotal.innerHTML=''
    result=0
    for(let i=0;i<arr.length;i++){
        result+=Number(parseInt(arr[i].price))
    }
    priceTotal.innerHTML +=result
    localStorage.setItem("total",result)
}
function popEnd(){
    Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your work has been saved",
        showConfirmButton: false,
        timer: 1500
    });
    localStorage.clear()
    arr.length=0
    setTimeout(()=>{
        getdata()
    },1500)
}
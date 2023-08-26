const menu = document.getElementsByClassName("menu")[0];

const banner = document.getElementsByClassName("banner")[0];
const home = document.getElementsByClassName("home")[0];

const container = document.getElementsByClassName("card-holder")[0];

let modal = document.getElementsByClassName("modal")[0];


let localArr = [];

menu.addEventListener("click", (e) => {
    e.preventDefault();
    banner.classList.add("hide");
    banner.classList.remove("enable");
})

home.addEventListener("click", (e) => {
    e.preventDefault();
    banner.classList.remove("hide");
    banner.classList.add("enable");
})


async function getMenu() {
    let url = "https://raw.githubusercontent.com/saksham-accio/f2_contest_3/main/food.json";

    let response = await fetch(url);
    let data = await response.json();


    localArr = data;

    addDataToUI(data);
}

getMenu();


function addDataToUI(data) {
    data.forEach((ele) => {

        let div = document.createElement("div")
        div.className = "card";

        div.innerHTML = ` <div class="upper">
        <img
            src="${ele.imgSrc}">
    </div>

     <div class="lower">

        <div class="name-price">
            <h3>${ele.name}</h3>
            <p>$${ele.price}/-</p>
        </div>

        <div class="add-icon">
            <button  class="oder" id="${ele.id}">+</button>
        </div>
     </div>`

        container.appendChild(div);
    })

    const add = document.getElementsByClassName("oder");


    Array.from(add).forEach((val) => {
        val.addEventListener("click", takeOrder);
    })

}

function takeOrder(e) {
    let id = parseInt(e.target.id);

    let amount = localArr[id - 1].price;
    let idName = localArr[id - 1].name;

    modal.style.display = "flex";
    modal.innerHTML = `<div class="modal-container">
    <h3>Nice Choice!</h3>

    <form>
        <label for="payment">Pay Your Amount</label>
        <input type="number" id="amount" placeholder="$${amount}/- Your Payble Amount" step="any" required>
        <button class="pay-btn">Pay</button>
    </form>
    <button class="cancel-btn">Cancel</button>
</div>`

    const cancel = document.getElementsByClassName("cancel-btn")[0];

    cancel.addEventListener("click", () => {

        let a = confirm("Please Pay Your Amount");

        if (a == false) {
            modal.style.display = "none";
            alert(`Oops Payment was not made, We have Many varieties. Please Select another food.`);
        }

       

    })

    let isPay = false;

    const form = document.getElementsByTagName("form")[0];

    form.addEventListener("submit", (e) => {

        e.preventDefault();
        isPay = true;
        
        modal.style.display = "none";

        OrderPrep(id);
    })
}

function OrderPrep(id)
{
    let idName = localArr[id - 1].name;
    
    setTimeout(() => {
        let a = alert(`Thanks for choosing ${idName}. Your Payment was accepted. Your order is start preparing.`);
        
        if(a==undefined)
        {
            thankYou(id);
        }
        
    }, 2000)

    
    
}

function thankYou(id)
{
    let idName = localArr[id - 1].name;

    setTimeout(() => {
        alert(`Your ${idName} is ready it will be delivered in 10mins. Enjoy Your Meal!`);
    }, 2500)

    
}
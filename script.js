const menu = document.getElementsByClassName("menu")[0];

const banner = document.getElementsByClassName("banner")[0];
const home = document.getElementsByClassName("home")[0];

const container = document.getElementsByClassName("card-holder")[0];

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

    console.log(data);

    addDataToUI(data);
}

getMenu();


function addDataToUI(data)
{
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
            <button>+</button>
        </div>
     </div>`

     container.appendChild(div);
    })
}
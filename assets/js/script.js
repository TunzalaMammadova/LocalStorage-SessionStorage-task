"use strict"

// sessionStorage.setItem("name","Aqshin");
// sessionStorage.setItem("surname","Aqshin");

// console.log(sessionStorage.getItem("name"));

// sessionStorage.clear();
// sessionStorage.removeItem("name");

// localStorage.setItem("name","Aqshin");

// let inputKey = document.querySelector(".input-key");
// let inputValue = document.querySelector(".input-value");

// let addBtn = document.querySelector("button");


// addBtn.addEventListener("click", function () {
//     let key = inputKey.value;
//     let value = inputValue.value;

//    localStorage.setItem(key,value);

//     inputKey.value = "";
//     inputValue.value = "";
// })

// let datas = ["Oruc", "Metanet", "Semed"];

// localStorage.setItem("datas", datas);


// let jsonData = {
//     name: "snkls",
//     surname: "dcnklv",
//     phones: [
//         234534, 535422
//     ],
//     group: [
//         {
//             name: "P418",
//             capacity: 40,
//             teacher: [
//                 "Cavid", 
//                 "Hemid"
//             ]
//         }
//     ]
// }

// console.log(jsonData.group[0].capacity);


// localStorage.setItem("datas",JSON.stringify(datas));

// console.log(JSON.parse(localStorage.getItem("datas")));

let basket = [];
let basketCountSpan = document.querySelector(".basket-count");
let basketPrice = document.querySelector(".basket-price")

if (JSON.parse(localStorage.getItem("basket")) == null) {
    localStorage.setItem("basket", JSON.stringify(basket));
}
else {
    basket = JSON.parse(localStorage.getItem("basket"))
}

getBasketCount(basket);


function getBasketCount(arr) {

    let basketCount = 0;

    if (arr.length != 0) {
        for (const item of basket) {
            basketCount += item.count;
        }
    }
    document.querySelector(".basket-count").innerText = basketCount;
}

getBasketPrice(basket);

function getBasketPrice(arr) {

    let basketPrice = 1;

    if (arr.length != 0) {

        for (const item of basket) {
            basketPrice += item.count * item.price;
        }
    }
    document.querySelector(".basket-price").innerText = basketPrice;
}


let addBtns = document.querySelectorAll("#products .add-btn");

addBtns.forEach(btn => {
    btn.addEventListener("click", function (e) {
        e.preventDefault();
        let productId = parseInt(this.parentNode.parentNode.getAttribute("data-id"));
        let productName = this.parentNode.firstElementChild.innerText;
        let productDesc = this.parentNode.firstElementChild.nextElementSibling.innerText;
        let productImage = this.parentNode.previousElementSibling.getAttribute("src");
        let productPrice = this.parentNode.firstElementChild.nextElementSibling.nextElementSibling.innerText;

        let existProduct = basket.find(m => m.id == productId);
        if (existProduct != undefined) {
            existProduct.count++;
        }

        else {
            basket.push({
                id: productId,
                name: productName,
                description: productDesc,
                image: productImage,
                price: productPrice,
                count: 1
            })
        }

        getBasketCount(basket);
        getBasketPrice(basket);
        localStorage.setItem("basket", JSON.stringify(basket))
    })
});


// cho hien len lay tu api

import {renderItems} from "./controller.js";
import {https} from "./service.js";


let carts = [];
let listProducts;

let idDisplay;
// add to cart
window.addToCart = (product_id) => {
    let checkquantityItems = carts.findIndex((item) => item.id == product_id)
    idDisplay = product_id
    if (carts.length <= 0) {
        carts = [{
                id: product_id,
                quantity: 1
            }]
    } else if (checkquantityItems < 0) {
        carts.push({id: product_id, quantity: 1});

    } else {
        carts[checkquantityItems].quantity = carts[checkquantityItems].quantity + 1;
    }

    console.log(checkquantityItems)
    console.log(idDisplay)
    console.log("list products ", listProducts)

    console.log("carst", carts)
    // can tìm ra quantity items và price

    renderCart();
    saveCartInfo()

};
// save cart info

let saveCartInfo = () => {
    localStorage.setItem('carts', JSON.stringify(carts))
}


// render cart
let renderCart = () => {
    let cartStr = "";
    let totalCartQuantity = 0;
    let totalPrice = 0;
    if (carts.length >= 0) {
        carts.forEach((item) => {
            // console.log("item id", item.id);
            // console.log("list Products", listProducts)
            totalCartQuantity += item.quantity;

            let findProIndex = listProducts.findIndex((product) => product.id == item.id)


            let proInfo = listProducts[findProIndex]
            let {img, name, price} = proInfo;

            // tính tổng tiền
            totalPrice += price * item.quantity

            console.log("🫀 ~ carts.forEach ~ totalPrice:", totalPrice)

            // console.log("🫀 ~ carts.forEach ~ proInfo:", proInfo)
            let cartDisplay = `<div class="cart_item-wrapper">
            <div class="cart_items">
              <div class="cart_img">
                <img
                  src=${img}
                  alt=""
                />
              </div>
              <div class="cart-name">${name}</div>
              <div class="cart_quantity">${
                item.quantity
            }</div>
              <div class="price">${price}</div>
              <div><button onclick= "removeCart(${
                item.id
            })" class= "removeBtn">remove</button></div>
            </div>
          </div>`
            cartStr += cartDisplay;


        })
        document.getElementById("modal_items-cart").innerHTML = cartStr;

        document.getElementById("totalPrice").innerText = totalPrice.toLocaleString() + "$"
        document.querySelector('.span_quantity').innerText = totalCartQuantity


    }

}


// close cart
window.closeCart = () => {
    document.querySelector('.modal_cart').style = "display: none";
    document.querySelector('.modal_background').style = "display: none";
    document.querySelector(".modal_background")
}

// open cart
window.openCart = () => {
    document.querySelector('.modal_cart').style = "display: flex";
    document.querySelector('.modal_background').style = "display: block";

}

// remove cart
// tìm index có cart.id == cart.id
window.removeCart = (cartId) => {
    const removeIndex = localStorage.getItem('carts');
    carts = JSON.parse(removeIndex);

    let cartFindIn = carts.findIndex((cart) => cart.id == cartId);
    carts.splice(cartFindIn, 1)
    localStorage.setItem('carts', JSON.stringify(carts));

    console.log("🫀 ~ cartFindIn:", cartFindIn)

    // localStorage.setItem('carts',carts)

    renderCart()


}


// chay
let fetchItems = () => {
    https.get("/phones").then((res) => {
        renderItems(res.data);
        listProducts = (res.data)
        if (localStorage.getItem('carts')) {
            carts = JSON.parse(localStorage.getItem('carts'));
            renderCart()
        }
    });
};
fetchItems();

// lọc
window.filterItems = () => {
    let loaiValue = document.getElementById('loaiItems').value;

    console.log("🫀 ~ loaiValue:", loaiValue)

    https.get('/phones').then((res => {
        let loaiArr = [];
        let filterItems = res.data.filter((item) => item.type == loaiValue);

        if (loaiValue == "iphone") {
            loaiArr.push(filterItems)
        } else if (loaiValue == "all" || loaiValue == "Selection") {
            loaiArr.push(res.data)
        } else {
            loaiArr.push(filterItems)
        };
        loaiArr.forEach((item) => {
            renderItems(item)
        })


    }))
}
window.payFunction = () => {
    localStorage.clear();


    // renderCart()
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Pay ment Successful',
        showConfirmButton: false,
        timer: 1500
    });
    setTimeout(() => {
        location.reload()
    }, 1000)


}

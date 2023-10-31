export let renderProducts = (productArr) => {
  var contentHTML = "";
  productArr.forEach((product) => {
    var {
      id,
      prodName,
      price,
      screen,
      backCamera,
      frontCamera,
      img,
      desc,
      type_phone,
    } = product;
    if (type_phone == "Samsung") {
      console.log(product);
    }

    let trString = `
        <tr >
            <td class = "pl-5" >${id}</td>
            <td class = "pl-5" >${prodName}</td>
            <td class = "pl-3">${type_phone}</td>
            <td class = "pl-5">${screen}</td>
            <td class = "pl-5">${price}</td>
            <td >
            <button class ="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded " onclick=editProd(${id})>Sửa</button>
            <button class ="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded " onclick=deleteProd(${id})>Xóa</button>
            </td>
        </tr>
      `;
    contentHTML += trString;
  });
  document.getElementById("tblProduct").innerHTML = contentHTML;
};

export let getData = (idValue) => document.querySelector(`#${idValue}`).value;

export let layThongtinTuForm = () => {
  let prodName = getData("pname");
  let price = getData("price");
  let screen = getData("screen");
  let backCamera = getData("backCamera");
  let frontCamera = getData("frontCamera");

  let img = getData("img");
  let desc = getData("desc");
  let type_phone = getData("type_phone");

  return {
    prodName,
    price,
    screen,
    backCamera,
    frontCamera,
    img,
    desc,
    type_phone,
  };
};

export let showData = (idValue) => {
  let {
    id,
    prodName,
    price,
    screen,
    backCamera,
    frontCamera,
    img,
    desc,
    type_phone,
  } = idValue;
  console.log(prodName);
  document.querySelector(`#pname`).value = prodName;
  document.querySelector(`#price`).value = price;
  document.querySelector(`#screen`).value = screen;
  document.querySelector(`#backCamera`).value = backCamera;
  document.querySelector(`#frontCamera`).value = frontCamera;
  document.querySelector(`#img`).value = img;
  document.querySelector(`#desc`).value = desc;
  document.querySelector(`#type_phone`).value =
    type_phone == "Iphone" ? "Iphone" : "Samsung";
};

export let toggleModal = () => {
  const body = document.querySelector("body");
  const modal = document.querySelector(".modal");
  modal.classList.toggle("opacity-0");
  modal.classList.toggle("pointer-events-none");
  body.classList.toggle("modal-active");
};
